(() => {
  'use strict';

  const API_ENDPOINT = 'https://api.tsunagari-jp.com/diagnosis.php';
  const app = document.getElementById('diagnosisApp');
  const artImage = document.getElementById('artImg');
  const diagnosisId = String(document.body.dataset.diagnosisId || '').trim();
  const pageTitle = String(document.body.dataset.pageTitle || '声の確認').trim();
  const initialRunToken = getRunTokenFromUrl();
  const storageKey = `cm-standard-diagnosis:${diagnosisId}:${initialRunToken ? initialRunToken.slice(-16) : 'common'}`;

  const allowedDiagnosisIds = new Set([
    'brand_attraction',
    'company_understanding',
    'philosophy_understanding',
    'employee_happiness',
    'employee_qol',
    'employee_retention',
    'workflow_bottleneck',
    'manager_burden',
    'newcomer_voice',
    'bcp_readiness',
    'compliance_harassment',
    'abuse_restraint_prevention',
    'privacy_record_management',
    'incident_risk_management'
  ]);

  const fallbackTitles = {
    brand_attraction: '会社の魅力は、ちゃんと伝わっているか',
    company_understanding: '従業員は、会社のことを理解して頑張れているか',
    philosophy_understanding: '従業員は、会社のことを理解して頑張れているか',
    employee_happiness: '従業員は今、幸せか',
    employee_qol: '従業員は今、幸せか',
    employee_retention: '従業員は、ここで働き続けたいと思っているか',
    workflow_bottleneck: '現場は、詰まらずに回っているか',
    manager_burden: '管理者は、抱え込まずに働けているか',
    newcomer_voice: '新人は、本音を言えているか',
    bcp_readiness: 'BCP実行力診断',
    compliance_harassment: 'ハラスメント予防・相談体制診断',
    abuse_restraint_prevention: '虐待・身体拘束・不適切ケア予防診断',
    privacy_record_management: '個人情報・記録管理体制診断',
    incident_risk_management: '事故・ヒヤリハット再発防止診断'
  };

  const fallbackBasicTypes = {
    brand_attraction: 'brand',
    company_understanding: 'employee',
    philosophy_understanding: 'employee',
    employee_happiness: 'employee',
    employee_qol: 'employee',
    employee_retention: 'employee',
    workflow_bottleneck: 'workflow',
    manager_burden: 'manager',
    newcomer_voice: 'newcomer',
    bcp_readiness: 'admin',
    compliance_harassment: 'employee',
    abuse_restraint_prevention: 'care_admin',
    privacy_record_management: 'care_admin',
    incident_risk_management: 'care_admin'
  };

  const state = {
    runtime: null,
    diagnosis: {},
    webConfig: {},
    assets: {},
    questions: [],
    choices: {},
    brandLocations: [],
    company: {},
    answers: {},
    currentIndex: 0,
    mode: '',
    consented: false,
    submitting: false,
    registering: false,
    illustrationData: Object.create(null),
    illustrationRequests: Object.create(null),
    clientRegistrationId: loadOrCreateRegistrationId(),
    clientSubmissionId: loadOrCreateSubmissionId(),
    runToken: initialRunToken,
    run: null
  };

  boot();

  async function boot() {
    if (!allowedDiagnosisIds.has(diagnosisId)) {
      renderError('診断IDを確認できません。正しいURLから開き直してください。');
      return;
    }

    const savedReceipt = readSessionReceipt();
    if (savedReceipt) {
      renderComplete(savedReceipt);
      return;
    }

    try {
      const response = await requestApi({
        action: 'standard_diagnosis_runtime',
        diagnosis_id: diagnosisId
      });
      const runtime = response.runtime || response.data || response;

      if (!runtime || runtime.ok === false) {
        throw new Error(runtime && runtime.message ? runtime.message : '診断情報を読み込めませんでした。');
      }

      state.runtime = runtime;
      state.diagnosis = runtime.diagnosis || {};
      state.webConfig = runtime.web_config || {};
      state.assets = runtime.assets || {};
      state.questions = Array.isArray(runtime.questions) ? runtime.questions : [];
      state.choices = runtime.choices || {};
      state.brandLocations = Array.isArray(runtime.brand_locations) ? runtime.brand_locations : [];

      if (!state.questions.length) {
        throw new Error('この診断の設問が登録されていません。');
      }

      if (state.runToken) {
        await resolveRunFromUrl();
      }

      document.title = `${displayTitle()}｜クロスメソッド™`;
      renderStart();
    } catch (error) {
      renderError(error && error.message ? error.message : '診断情報を読み込めませんでした。');
    }
  }

  async function requestApi(payload) {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
      credentials: 'omit',
      referrerPolicy: 'no-referrer'
    });
    const text = await response.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch (_) {
      throw new Error('診断サーバーから正しい応答を受け取れませんでした。');
    }

    if (!response.ok || !data || data.ok === false) {
      throw new Error(data && data.message ? data.message : '診断サーバーへ接続できませんでした。');
    }

    return data;
  }

  async function resolveRunFromUrl() {
    const result = await requestApi({
      action: 'resolve_standard_diagnosis_run',
      diagnosis_id: activeDiagnosisId(),
      run_token: state.runToken
    });

    state.run = result.run || null;
    if (!state.run || !state.run.company_name) {
      throw new Error('会社専用の診断情報を確認できませんでした。');
    }
  }

  function renderStart() {
    setScreen('start');
    setPageArt(state.questions[0]);
    const runInfo = state.run
      ? `<div class="diagnosis-company"><span>会社・事業所</span><strong>${escapeHtml(publicCompanyName(state.run.company_name))}</strong></div>`
      : '';

    app.innerHTML = `<div class="stage">
      <div class="card">
        <div class="pill">クロスメソッド™｜声の確認</div>
        <h1 class="hero-title">${escapeHtml(displayTitle())}</h1>
        ${runInfo}
        <p>この確認は、良い・悪いを決めるものではありません。今の状態を整理し、次に確認すべき声を見つけるための入口です。</p>
        <div class="note">回答内容は、職場やサービスをより良くするための確認材料として扱います。個人を責めるためのものではありません。</div>
        <div id="screenError" class="error" role="alert"></div>
        <div class="actions">
          <button class="btn-primary btn-start" type="button" id="startButton">はじめる</button>
        </div>
      </div>
    </div>`;
    syncMobileVisual(state.questions[0], 'start');

    document.getElementById('startButton').addEventListener('click', () => {
      state.consented = true;
      renderBasicInfo();
    });
  }

  function renderBasicInfo() {
    setScreen('basic');
    setPageArt(state.questions[0]);
    renderShell(
      `<div class="pill">基本情報</div>
       <h2>回答のための基本情報を入力してください</h2>
       <p>${state.run ? '会社情報は専用URLから読み込まれています。必須項目を入力して、設問へ進んでください。' : '初回のみ会社情報を登録し、社内共有用の専用URLを発行します。'}</p>`,
      `<p>回答を集計するための情報です。個人を責めるための情報ではありません。</p>
       <div class="diagnosis-form">${basicInfoFields()}</div>
       ${state.run ? '' : '<div class="diagnosis-note">入力後、2人目以降の方へ共有できる会社専用URLが表示されます。</div>'}
       <div id="screenError" class="diagnosis-error" role="alert"></div>
       <div class="diagnosis-actions">
         <button class="diagnosis-button diagnosis-button--secondary" type="button" id="backButton">戻る</button>
         <button class="diagnosis-button diagnosis-button--primary" type="button" id="basicNextButton">${state.run ? '設問へ進む' : '会社専用URLを発行する'}</button>
       </div>`
    );

    document.getElementById('backButton').addEventListener('click', renderStart);
    document.getElementById('basicNextButton').addEventListener('click', saveBasicInfo);
  }

  function basicInfoFields() {
    const type = basicType();
    const company = state.run
      ? `<div class="diagnosis-company diagnosis-field--full"><span>会社・事業所</span><strong>${escapeHtml(publicCompanyName(state.run.company_name))}</strong></div>`
      : fieldHtml('companyName', '会社名・店舗名・事業所名', '例：株式会社〇〇 / 〇〇事業所', true, true);
    const common = company +
      fieldHtml('personName', type === 'manager' ? 'お名前・管理者名' : 'お名前', '入力してください', true, false) +
      fieldHtml('jobDepartment', '職種・部署（任意）', '例：介護職 / 営業 / 管理部門', false, false);

    if (type === 'manager') {
      return common + fieldHtml('role', '役職（任意）', '例：主任 / 店長 / 管理者', false, false);
    }

    if (type === 'newcomer') {
      return common + selectHtml('monthsSinceJoined', '入社後の期間（任意）', [
        '1ヶ月未満', '1〜3ヶ月', '4〜6ヶ月', '7〜12ヶ月', '1〜2年', '2〜3年'
      ]);
    }

    if (type === 'workflow') {
      return common + selectHtml('tenure', '勤続年数（任意）', [
        '1年未満', '1〜3年', '3〜5年', '5〜10年', '10年以上'
      ]);
    }

    return common;
  }

  function fieldHtml(id, label, placeholder, required, full) {
    return `<div class="diagnosis-field ${full ? 'diagnosis-field--full' : ''}">
      <label for="${id}">${escapeHtml(label)}${required ? ' <span class="diagnosis-required">*</span>' : ''}</label>
      <input id="${id}" type="text" maxlength="180" value="${escapeAttr(companyFieldValue(id))}" placeholder="${escapeAttr(placeholder)}" ${required ? 'required' : ''}>
    </div>`;
  }

  function selectHtml(id, label, options) {
    const selected = companyFieldValue(id);
    return `<div class="diagnosis-field">
      <label for="${id}">${escapeHtml(label)}</label>
      <select id="${id}">
        <option value="">選択してください</option>
        ${options.map(option => `<option value="${escapeAttr(option)}" ${option === selected ? 'selected' : ''}>${escapeHtml(option)}</option>`).join('')}
      </select>
    </div>`;
  }

  async function saveBasicInfo() {
    const companyName = state.run
      ? String(state.run.company_name || '').trim()
      : valueOf('companyName');
    const personName = valueOf('personName');

    if (!companyName) {
      showScreenError('会社名・店舗名・事業所名を入力してください。');
      focusField('companyName');
      return;
    }
    if (!personName) {
      showScreenError('お名前を入力してください。');
      focusField('personName');
      return;
    }

    state.company = {
      company_name: companyName,
      office_name: '',
      respondent_type: respondentType(),
      respondent_name: personName,
      respondent_email: '',
      job_department: valueOf('jobDepartment'),
      role: valueOf('role'),
      tenure: valueOf('tenure'),
      months_since_joined: valueOf('monthsSinceJoined'),
      employee_count: '',
      industry: '',
      location_id: '',
      mode: 'hp_standard'
    };

    if (state.run) {
      renderQuestion(Math.min(state.currentIndex, state.questions.length - 1));
      return;
    }

    if (state.registering) return;
    state.registering = true;
    const button = document.getElementById('basicNextButton');
    if (button) {
      button.disabled = true;
      button.textContent = 'URLを発行しています…';
    }

    try {
      const result = await requestApi({
        action: 'prepare_standard_diagnosis_run',
        diagnosis_id: activeDiagnosisId(),
        client_registration_id: state.clientRegistrationId,
        run_name: '',
        company: state.company
      });

      state.run = result.run || null;
      if (!state.run || !state.run.public_url) {
        throw new Error('発行された会社専用URLを確認できません。');
      }

      state.runToken = getRunTokenFromUrl(state.run.public_url);
      if (!state.runToken) {
        throw new Error('会社専用URLの識別情報を確認できません。');
      }

      try {
        window.history.replaceState(null, '', state.run.public_url);
      } catch (_) {}

      renderRunIssued();
    } catch (error) {
      state.registering = false;
      if (button) {
        button.disabled = false;
        button.textContent = '会社専用URLを発行する';
      }
      showScreenError(error && error.message ? error.message : '会社専用URLを発行できませんでした。');
    }
  }

  function renderRunIssued() {
    state.registering = false;
    setScreen('basic');
    setPageArt(state.questions[0]);
    renderShell(
      `<div class="pill">会社専用URL</div>
       <h1>会社専用URLを<br>発行しました</h1>
       <p>この実施回の回答は、同じ会社・診断としてまとめて保存されます。</p>`,
      `<h2>${escapeHtml(publicCompanyName(state.run.company_name))}</h2>
       <div class="diagnosis-note"><strong>2人目以降の方へ</strong><br>下のURLをそのまま共有してください。会社名を入力せずに診断を始められます。</div>
       <div id="issuedUrl" class="diagnosis-issued-url">${escapeHtml(state.run.public_url || '')}</div>
       <div id="copyStatus" class="diagnosis-copy-status" aria-live="polite"></div>
       <div class="diagnosis-actions">
         <button class="diagnosis-button diagnosis-button--secondary" type="button" id="copyUrlButton">会社専用URLをコピーする</button>
         <button class="diagnosis-button diagnosis-button--primary" type="button" id="continueButton">このまま回答する</button>
       </div>
       <p class="diagnosis-small-note">初回の方は、この画面からそのまま回答できます。発行したURLを開き直す必要はありません。</p>`
    );

    document.getElementById('copyUrlButton').addEventListener('click', copyIssuedUrl);
    document.getElementById('continueButton').addEventListener('click', () => renderQuestion(0));
  }

  async function copyIssuedUrl() {
    const url = String(state.run && state.run.public_url || '').trim();
    const status = document.getElementById('copyStatus');

    if (!url) {
      if (status) status.textContent = 'コピーするURLがありません。';
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      if (status) status.textContent = '会社専用URLをコピーしました。';
    } catch (_) {
      if (status) status.textContent = '自動コピーできないため、上のURLを選択してコピーしてください。';
    }
  }

  function renderQuestion(index) {
    state.currentIndex = Math.max(0, Math.min(index, state.questions.length - 1));
    const question = state.questions[state.currentIndex];
    const current = state.currentIndex + 1;
    const total = state.questions.length;
    const percent = Math.round((current / total) * 100);
    setScreen('question');
    setPageArt(question);
    app.innerHTML = `<div class="progress-wrap">
      <div class="progress-meta"><span>${current} / ${total}</span><span>${escapeHtml(displayTitle())}</span></div>
      <div class="progress"><div class="bar" style="width:${percent}%"></div></div>
    </div>
    <div class="stage">
      <div class="card question-card">
        <p class="question-number">QUESTION ${String(current).padStart(2, '0')}</p>
        <h2 class="q-text">${escapeHtml(question.question_text || '')}</h2>
        <div id="answerArea" class="diagnosis-answer"></div>
        <div id="screenError" class="error" role="alert"></div>
        <div class="actions">
          <button class="btn-secondary" type="button" id="questionBackButton">戻る</button>
          <button class="btn-primary" type="button" id="questionNextButton">${current === total ? '確認へ進む' : '次へ'}</button>
        </div>
      </div>
    </div>`;
    syncMobileVisual(question, 'question');

    renderAnswer(question);
    document.getElementById('questionBackButton').addEventListener('click', () => {
      if (state.currentIndex === 0) renderBasicInfo();
      else renderQuestion(state.currentIndex - 1);
    });
    document.getElementById('questionNextButton').addEventListener('click', () => nextQuestion(question));
  }

  function renderAnswer(question) {
    const area = document.getElementById('answerArea');
    const answerType = String(question.answer_type || '').trim();
    const existing = state.answers[question.question_id] || null;

    if (answerType === 'textarea') {
      area.innerHTML = `<textarea id="freeAnswer" maxlength="4000" placeholder="感じていること、伝えたいことを入力してください。">${escapeHtml(existing ? existing.answer_text || '' : '')}</textarea>`;
      document.getElementById('freeAnswer').addEventListener('input', event => {
        state.answers[question.question_id] = makeAnswer(question, '', event.target.value);
      });
      return;
    }

    if (answerType === 'text') {
      area.innerHTML = `<input id="textAnswer" type="text" maxlength="4000" value="${escapeAttr(existing ? existing.answer_text || '' : '')}" placeholder="入力してください">`;
      document.getElementById('textAnswer').addEventListener('input', event => {
        state.answers[question.question_id] = makeAnswer(question, event.target.value, event.target.value);
      });
      return;
    }

    if (answerType === 'select') {
      const choices = choicesFor(question);
      area.innerHTML = `<select id="selectAnswer"><option value="">選択してください</option>${choices.map(choice => {
        const selected = existing && String(existing.answer_value) === String(choice.value);
        return `<option value="${escapeAttr(choice.value)}" ${selected ? 'selected' : ''}>${escapeHtml(choice.label)}</option>`;
      }).join('')}</select>`;
      document.getElementById('selectAnswer').addEventListener('change', event => {
        const option = event.target.options[event.target.selectedIndex];
        state.answers[question.question_id] = makeAnswer(question, event.target.value, option ? option.textContent : '');
      });
      return;
    }

    const choices = choicesFor(question);
    area.innerHTML = `<div class="choice-list">${choices.map((choice, index) => {
      const selected = existing && String(existing.answer_value) === String(choice.value);
      return `<button type="button" class="choice ${selected ? 'selected' : ''}" data-choice-index="${index}" aria-pressed="${selected ? 'true' : 'false'}"><span class="choice-dot" aria-hidden="true"></span><span>${escapeHtml(choice.label)}</span></button>`;
    }).join('')}</div>`;

    area.querySelectorAll('[data-choice-index]').forEach(button => {
      button.addEventListener('click', () => {
        const choice = choices[Number(button.dataset.choiceIndex)];
        state.answers[question.question_id] = makeAnswer(question, choice.value, choice.label);
        renderAnswer(question);
      });
    });
  }

  function nextQuestion(question) {
    if (!isAnswerValid(question)) {
      showScreenError(String(question.answer_type || '') === 'textarea' ? '自由記述を入力してください。' : 'この設問に回答してください。');
      return;
    }

    if (state.currentIndex >= state.questions.length - 1) renderConfirm();
    else renderQuestion(state.currentIndex + 1);
  }

  function renderConfirm() {
    setScreen('confirm');
    setPageArt(state.questions[state.questions.length - 1]);
    const rows = [
      ['診断', displayTitle()],
      ['会社名・店舗名・事業所名', state.company.company_name || ''],
      ['お名前', state.company.respondent_name || ''],
      ['職種・部署', state.company.job_department || '未入力'],
      ['回答数', `${Object.keys(state.answers).length}件`]
    ];

    renderShell(
      `<div class="pill">送信前確認</div>
       <h1>送信前の確認</h1>
       <p>内容を確認し、問題がなければ回答を送信してください。</p>`,
      `<h2>回答を送信します</h2>
       <p>送信ボタンは一度だけ押してください。通信中は画面を閉じずにお待ちください。</p>
       <div class="diagnosis-summary">${rows.map(row => `<div class="diagnosis-summary__row"><strong>${escapeHtml(row[0])}</strong><span>${escapeHtml(row[1])}</span></div>`).join('')}</div>
       <div id="screenError" class="diagnosis-error" role="alert"></div>
       <div class="diagnosis-actions">
         <button class="diagnosis-button diagnosis-button--secondary" type="button" id="editInfoButton">基本情報を修正</button>
         <button class="diagnosis-button diagnosis-button--secondary" type="button" id="editAnswersButton">回答を修正</button>
         <button class="diagnosis-button diagnosis-button--primary" type="button" id="submitButton">回答を送信する</button>
       </div>`
    );

    document.getElementById('editInfoButton').addEventListener('click', renderBasicInfo);
    document.getElementById('editAnswersButton').addEventListener('click', () => renderQuestion(state.questions.length - 1));
    document.getElementById('submitButton').addEventListener('click', submitAnswers);
  }

  async function submitAnswers() {
    if (state.submitting) return;
    if (!state.runToken || !state.run) {
      showScreenError('会社専用の診断URLを確認できません。最初から開き直してください。');
      return;
    }
    const button = document.getElementById('submitButton');
    state.submitting = true;
    button.disabled = true;
    button.textContent = '送信しています…';

    try {
      const result = await requestApi({
        action: 'submit_standard_diagnosis_run',
        diagnosis_id: activeDiagnosisId(),
        run_token: state.runToken,
        client_submission_id: state.clientSubmissionId,
        submitted_client_at: new Date().toISOString(),
        respondent: {
          respondent_type: state.company.respondent_type,
          respondent_name: state.company.respondent_name,
          job_department: state.company.job_department,
          role: state.company.role,
          tenure: state.company.tenure,
          months_since_joined: state.company.months_since_joined
        },
        answers: state.questions.map(question => state.answers[question.question_id]).filter(Boolean)
      });
      writeSessionReceipt(result);
      renderComplete(result);
    } catch (error) {
      state.submitting = false;
      button.disabled = false;
      button.textContent = '回答を送信する';
      showScreenError(error && error.message ? error.message : '回答を送信できませんでした。');
    }
  }

  function renderComplete(result) {
    const receipt = result && (result.response_id || result.request_id) ? String(result.response_id || result.request_id) : '';
    setScreen('complete');
    setPageArt(state.questions[0]);
    renderShell(
      `<div class="pill">送信完了</div>
       <h1>回答を受け付けました</h1>
       <p>ご協力いただき、ありがとうございます。</p>`,
      `<div class="diagnosis-complete">
         <div class="diagnosis-complete__icon" aria-hidden="true">✓</div>
         <h2>送信が完了しました</h2>
         <p>いただいた声は、より良い職場・組織づくりのために活用されます。この画面は閉じていただいて構いません。</p>
         ${receipt ? `<p class="diagnosis-receipt">受付ID：${escapeHtml(receipt)}</p>` : ''}
       </div>`
    );
  }

  function renderError(message) {
    setScreen('error');
    setPageArt(null);
    app.innerHTML = `<div class="stage"><div class="card"><h2>診断を表示できません</h2><p>しばらく時間を置いて、もう一度お試しください。</p><div class="error is-visible" role="alert">${escapeHtml(message)}</div><div class="actions"><button class="btn-primary" type="button" id="reloadButton">再読み込みする</button></div></div></div>`;
    document.getElementById('reloadButton').addEventListener('click', () => window.location.reload());
  }

  function renderShell(heroHtml, contentHtml) {
    app.innerHTML = `<div class="stage"><div class="card">${heroHtml}${contentHtml}</div></div>`;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function setScreen(name) {
    document.body.setAttribute('data-screen', name);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function displayTitle() {
    return String(
      state.webConfig.web_display_title ||
      state.diagnosis.web_display_title ||
      pageTitle ||
      fallbackTitles[diagnosisId] ||
      state.diagnosis.diagnosis_name ||
      '声の確認'
    ).trim();
  }

  function activeDiagnosisId() {
    return String(state.diagnosis.diagnosis_id || diagnosisId).trim();
  }

  function basicType() {
    return String(state.webConfig.basic_info_type || fallbackBasicTypes[diagnosisId] || 'employee').trim();
  }

  function respondentType() {
    const type = basicType();
    if (type === 'manager') return 'manager';
    if (type === 'newcomer') return 'newcomer';
    if (type === 'admin' || type === 'care_admin') return 'executive';
    if (type === 'workflow') return 'employee';
    return 'employee';
  }

  function companyFieldValue(id) {
    const map = {
      companyName: 'company_name',
      personName: 'respondent_name',
      jobDepartment: 'job_department',
      role: 'role',
      tenure: 'tenure',
      monthsSinceJoined: 'months_since_joined'
    };
    return String(state.company[map[id]] || '');
  }

  function choicesFor(question) {
    const scaleKey = resolveScaleKey(question);
    const raw = state.choices[scaleKey] || state.choices[question.scale_type] || state.choices.scale_5_agree || [];
    return Array.isArray(raw) ? raw.map(choice => ({
      value: choice && choice.value !== undefined ? choice.value : '',
      label: choice && choice.label !== undefined ? String(choice.label) : ''
    })) : [];
  }

  function resolveScaleKey(question) {
    const answerType = String(question.answer_type || '').trim();
    const raw = String(question.scale_type || '').trim();
    const text = String(question.question_text || '').trim();

    if (answerType === 'scale_10') return 'scale_0_10_recommend';
    if (raw && raw !== 'scale_5_agree') return raw;
    if (/ありたい|ていたい|保てていたい|持てていたい/.test(text)) return 'scale_5_want';
    if (/説明できる/.test(text)) return 'scale_5_can_explain';
    if (/イメージ/.test(text)) return 'scale_5_imagable';
    if (/勧めてもよい|おすすめ|推奨/.test(text)) return 'scale_5_recommend_intent';
    if (/相談しやすい|伝えやすい|話しやすい|質問しやすい|相談できる|報告できる|共有できる/.test(text)) return 'scale_5_easy';
    if (/理解している/.test(text)) return 'scale_5_understand';
    if (/明確|決まっている|整理されている|整備されている|統一されている|実施している|確認している|記録|保管|ルールがある|仕組みがある|体制がある/.test(text)) return 'scale_5_ready';
    if (/できている|できる|働けている/.test(text)) return 'scale_5_can';
    if (/安心感がある|感覚がある|場がある|視点がある|備えがある|文化がある/.test(text)) return 'scale_5_has';
    if (/感じる|感じている|感じた/.test(text)) return 'scale_5_feel';
    return 'scale_5_agree';
  }

  function makeAnswer(question, value, text) {
    return {
      question_id: String(question.question_id || '').trim(),
      answer_value: value,
      answer_text: String(text || '').trim(),
      answer_type: String(question.answer_type || '').trim()
    };
  }

  function isAnswerValid(question) {
    const answer = state.answers[question.question_id];
    const required = question.is_required === true || ['true', '1', 'yes', '必須'].includes(String(question.is_required || '').toLowerCase());
    const answerType = String(question.answer_type || '').trim();

    if (!required && !answer) return true;
    if (!answer) return false;
    if (answerType === 'textarea' || answerType === 'text') return Boolean(String(answer.answer_text || '').trim());
    return Boolean(String(answer.answer_value === undefined || answer.answer_value === null ? '' : answer.answer_value).trim());
  }

  function questionArtUrl(question) {
    if (!question) return '';
    var inlineData = String(
      question.illustration_data_uri || ''
    ).trim();
    if (inlineData.indexOf('data:image/') === 0) return inlineData;
    return String(state.illustrationData[questionArtKey(question)] || '').trim();
  }

  function hasQuestionArt(question) {
    if (!question) return false;
    return Boolean(String(
      question.illustration_data_uri ||
      question.illustration_url ||
      question.illustration_file_id ||
      question.illustration_file_url ||
      question.image_slot ||
      ''
    ).trim());
  }

  function questionArtKey(question) {
    if (!question) return '';
    return [
      activeDiagnosisId(),
      String(question.question_id || '').trim(),
      String(question.image_slot || '').trim()
    ].join(':');
  }

  async function loadQuestionArt(question) {
    if (!question || !hasQuestionArt(question)) return;
    const key = questionArtKey(question);
    const existing = questionArtUrl(question);

    if (existing) {
      applyQuestionArt(key, existing);
      return;
    }

    if (!state.illustrationRequests[key]) {
      state.illustrationRequests[key] = requestApi({
        action: 'standard_diagnosis_illustration',
        diagnosis_id: activeDiagnosisId(),
        question_id: String(question.question_id || '').trim(),
        image_slot: String(question.image_slot || '').trim()
      }).then(result => {
        const dataUri = String(result.image_data_uri || '').trim();
        if (dataUri.indexOf('data:image/') !== 0) {
          throw new Error('画像データを確認できません。');
        }
        state.illustrationData[key] = dataUri;
        return dataUri;
      }).finally(() => {
        delete state.illustrationRequests[key];
      });
    }

    try {
      const dataUri = await state.illustrationRequests[key];
      applyQuestionArt(key, dataUri);
    } catch (_) {
      showQuestionArtError(key);
    }
  }

  function applyQuestionArt(key, dataUri) {
    const safe = String(dataUri).replace(/"/g, '%22');
    if (artImage && artImage.dataset.artKey === key) {
      artImage.style.backgroundImage = `url("${safe}")`;
      artImage.classList.remove('is-preloading');
      artImage.classList.remove('is-error');
    }
    document.querySelectorAll('.cm-mobile-art-image').forEach(element => {
      if (element.dataset.artKey === key) element.style.backgroundImage = `url("${safe}")`;
    });
  }

  function showQuestionArtError(key) {
    if (!artImage || artImage.dataset.artKey !== key) return;
    artImage.classList.remove('is-preloading');
    artImage.classList.add('is-error');
  }

  function setPageArt(question) {
    if (!artImage) return;
    const key = questionArtKey(question);
    const dataUri = questionArtUrl(question);
    artImage.dataset.artKey = key;
    artImage.classList.remove('is-error');

    if (dataUri) {
      applyQuestionArt(key, dataUri);
      return;
    }

    artImage.style.backgroundImage = 'radial-gradient(circle at 62% 34%, rgba(111,227,229,.24), transparent 32%), linear-gradient(135deg, rgba(255,255,255,.9), rgba(232,248,250,.76))';
    artImage.classList.toggle('is-preloading', hasQuestionArt(question));
    if (hasQuestionArt(question)) loadQuestionArt(question);
  }

  function syncMobileVisual(question, screen) {
    document.querySelectorAll('.cm-mobile-start-visual,.cm-mobile-question-visual').forEach(element => element.remove());
    if (!window.matchMedia || !window.matchMedia('(max-width: 860px)').matches || !question) return;

    const key = questionArtKey(question);
    const dataUri = questionArtUrl(question);
    const visual = document.createElement('div');
    visual.className = screen === 'question' ? 'cm-mobile-question-visual' : 'cm-mobile-start-visual';
    const image = document.createElement('div');
    image.className = 'cm-mobile-art-image';
    image.dataset.artKey = key;
    if (dataUri) image.style.backgroundImage = `url("${String(dataUri).replace(/"/g, '%22')}")`;
    visual.appendChild(image);

    if (screen === 'question') {
      const card = app.querySelector('.question-card');
      if (card) card.insertBefore(visual, card.firstChild);
    } else {
      const stage = app.querySelector('.stage');
      const card = stage && stage.querySelector('.card');
      if (stage && card) stage.insertBefore(visual, card);
    }
  }

  function cssEscape(value) {
    if (window.CSS && typeof window.CSS.escape === 'function') {
      return window.CSS.escape(String(value));
    }
    return String(value).replace(/["\\]/g, '\\$&');
  }

  function showScreenError(message) {
    const box = document.getElementById('screenError');
    if (!box) return;
    box.textContent = message;
    box.classList.add('is-visible');
    box.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function valueOf(id) {
    const element = document.getElementById(id);
    return element ? String(element.value || '').trim() : '';
  }

  function focusField(id) {
    const element = document.getElementById(id);
    if (element) element.focus();
  }

  function loadOrCreateRegistrationId() {
    try {
      const key = `${storageKey}:registration-id`;
      const saved = sessionStorage.getItem(key);
      if (saved) return saved;
      const value = createRegistrationId();
      sessionStorage.setItem(key, value);
      return value;
    } catch (_) {
      return createRegistrationId();
    }
  }

  function loadOrCreateSubmissionId() {
    try {
      const saved = sessionStorage.getItem(`${storageKey}:submission-id`);
      if (saved) return saved;
      const value = createSubmissionId();
      sessionStorage.setItem(`${storageKey}:submission-id`, value);
      return value;
    } catch (_) {
      return createSubmissionId();
    }
  }

  function createSubmissionId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') return `web_${window.crypto.randomUUID()}`;
    const random = Math.random().toString(36).slice(2);
    return `web_${Date.now().toString(36)}_${random}`;
  }

  function createRegistrationId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') return `reg_${window.crypto.randomUUID()}`;
    const random = Math.random().toString(36).slice(2);
    return `reg_${Date.now().toString(36)}_${random}`;
  }

  function getRunTokenFromUrl(url) {
    try {
      const target = new URL(url || window.location.href, window.location.href);
      return String(target.searchParams.get('run') || '').trim();
    } catch (_) {
      return '';
    }
  }

  function publicCompanyName(value) {
    return String(value || '')
      .replace(/^【HP実施回試験】/, '')
      .replace(/^【HP保存試験】/, '')
      .trim();
  }

  function writeSessionReceipt(result) {
    try {
      sessionStorage.setItem(`${storageKey}:receipt`, JSON.stringify({
        ok: true,
        response_id: String(result.response_id || ''),
        request_id: String(result.request_id || '')
      }));
    } catch (_) {}
  }

  function readSessionReceipt() {
    try {
      const raw = sessionStorage.getItem(`${storageKey}:receipt`);
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function escapeHtml(value) {
    return String(value === undefined || value === null ? '' : value).replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    })[character]);
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, '&#096;');
  }
})();
