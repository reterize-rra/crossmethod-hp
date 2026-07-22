<?php
declare(strict_types=1);

/**
 * クロスメソッド™ 本番診断HP化
 * Xserver → GAS 中継API 疎通試験 V1
 *
 * 次の2項目だけ、導入手順に沿って変更してください。
 */
const CM_GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyry81Iz099oNXCqYg7q9ysH6ik9u-MGPrxa5eYbuegoM_ScfO1eGMxFddYX2wmhFU2wQ/exec';
const CM_API_SECRET = 'f852200ae259420fae0d8ab7dfbb4f313856c6d033de409dbe29ab69a473da17';

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode([
        'ok' => true,
        'gateway' => 'ready',
        'version' => 'v1_20260722',
        'message' => 'Xserver側のPHPは動作しています。'
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'ok' => false,
        'message' => '許可されていないHTTPメソッドです。'
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

try {
    if (
        CM_GAS_WEB_APP_URL === 'PASTE_GAS_WEB_APP_EXEC_URL_HERE' ||
        CM_API_SECRET === 'PASTE_SHARED_SECRET_HERE'
    ) {
        throw new RuntimeException('diagnosis.php のGAS URLまたは共有シークレットが未設定です。');
    }

    $raw = file_get_contents('php://input');
    $input = json_decode($raw ?: '', true, 32, JSON_THROW_ON_ERROR);

    $action = trim((string)($input['action'] ?? ''));
    $allowedActions = ['ping', 'runtime_summary'];

    if (!in_array($action, $allowedActions, true)) {
        throw new RuntimeException('許可されていないactionです。');
    }

    $payload = [
        'action' => $action,
        'api_secret' => CM_API_SECRET
    ];

    if ($action === 'runtime_summary') {
        $payload['diagnosis_id'] = trim((string)($input['diagnosis_id'] ?? 'human_os'));
    }

    $result = cmCallGasApi(CM_GAS_WEB_APP_URL, $payload);
    http_response_code($result['status']);
    echo $result['body'];
} catch (JsonException $error) {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'message' => '送信データをJSONとして読み取れませんでした。'
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} catch (Throwable $error) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'message' => $error->getMessage()
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}

function cmCallGasApi(string $url, array $payload): array
{
    $json = json_encode(
        $payload,
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR
    );

    if (function_exists('curl_init')) {
        $curl = curl_init($url);
        if ($curl === false) {
            throw new RuntimeException('cURLを初期化できませんでした。');
        }

        curl_setopt_array($curl, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $json,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json; charset=UTF-8'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_CONNECTTIMEOUT => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_SSL_VERIFYHOST => 2,
            CURLOPT_USERAGENT => 'CrossMethod-Diagnosis-Lab/1.0'
        ]);

        $body = curl_exec($curl);
        $error = curl_error($curl);
        $status = (int)curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);

        if ($body === false || $error !== '') {
            throw new RuntimeException('GASへの接続に失敗しました：' . $error);
        }

        return [
            'status' => $status >= 400 ? $status : 200,
            'body' => $body
        ];
    }

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/json; charset=UTF-8\r\n",
            'content' => $json,
            'timeout' => 30,
            'ignore_errors' => true
        ]
    ]);

    $body = file_get_contents($url, false, $context);
    if ($body === false) {
        throw new RuntimeException('GASへの接続に失敗しました。');
    }

    return ['status' => 200, 'body' => $body];
}
