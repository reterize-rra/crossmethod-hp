export const contracts={
 "setMerchantProfile": {
  "entityCode":{"label":"法人区分","kind":"enum","choices":["healthy_food","meguri_usage_fee"],"optional":false},
  "legalName":{"label":"正式法人名","kind":"text","maxLength":200,"optional":false},
  "publicBusinessName":{"label":"表示名","kind":"text","maxLength":200,"optional":false},
  "supportEmail":{"label":"お問い合わせ先メールアドレス","kind":"email","optional":false},
  "statementDescriptor":{"label":"明細表記","kind":"text","maxLength":22,"optional":true},
  "active":{"label":"有効状態","kind":"boolean","optional":false}
 },
  "createEnterprise": {
    "clientRequestId": {
      "label": "送信識別情報",
      "kind": "uuid",
      "optional": false
    },
    "usageType": {
      "label": "利用区分",
      "kind": "enum",
      "optional": false,
      "choices": [
        "trial",
        "paid"
      ]
    },
    "legalName": {
      "label": "企業名",
      "kind": "text",
      "optional": false,
      "maxLength": 200
    },
    "industryCategory": {
      "label": "業種",
      "kind": "enum",
      "optional": false,
      "choices": [
        "医療・福祉",
        "サービス",
        "製造",
        "情報通信",
        "建設",
        "卸売・小売",
        "宿泊・飲食",
        "教育",
        "その他"
      ]
    },
    "primaryWorktypeCategory": {
      "label": "主な働き方",
      "kind": "enum",
      "optional": false,
      "choices": [
        "対人支援",
        "現場・店舗",
        "オフィス",
        "リモート中心",
        "複合"
      ]
    },
    "contractedUserCapacity": {
      "label": "契約人数",
      "kind": "integer",
      "optional": false,
      "min": 1,
      "max": 10000000
    },
    "contractStartedOn": {
      "label": "契約開始日",
      "kind": "date",
      "optional": false
    },
    "areaAggregationEnabled": {
      "label": "エリア集計",
      "kind": "boolean",
      "optional": false
    },
    "initialAdminName": {
      "label": "初期管理者名",
      "kind": "text",
      "optional": false,
      "maxLength": 100
    },
    "initialAdminEmail": {
      "label": "初期管理者メール",
      "kind": "email",
      "optional": false
    }
  },
  "createEnterpriseInvitation": {
    "enterpriseId": {
      "label": "企業",
      "kind": "uuid",
      "optional": false
    },
    "clientRequestId": {
      "label": "送信識別情報",
      "kind": "uuid",
      "optional": false
    },
    "inviteKind": {
      "label": "招待種別",
      "kind": "enum",
      "optional": false,
      "choices": [
        "employee",
        "role_holder",
        "system_admin"
      ]
    },
    "recipientName": {
      "label": "氏名",
      "kind": "text",
      "optional": true,
      "maxLength": 100
    },
    "recipientEmail": {
      "label": "招待先メール",
      "kind": "email",
      "optional": false
    },
    "expiresInDays": {
      "label": "有効日数",
      "kind": "integer",
      "optional": true,
      "min": 1,
      "max": 30,
      "default": 7
    }
  },
  "changeEnterpriseUsage": {
    "enterpriseId": {
      "label": "企業",
      "kind": "uuid",
      "optional": false
    },
    "usageType": {
      "label": "利用区分",
      "kind": "enum",
      "optional": false,
      "choices": [
        "trial",
        "paid"
      ]
    },
    "effectiveOn": {
      "label": "適用日",
      "kind": "date",
      "optional": false
    }
  },
  "setEnterpriseService": {
    "enterpriseId": {
      "label": "企業",
      "kind": "uuid",
      "optional": false
    },
    "serviceCode": {
      "label": "サービス",
      "kind": "enum",
      "optional": false,
      "choices": [
        "evaluation",
        "customer_voice",
        "traits",
        "support",
        "stress_check"
      ]
    },
    "enabled": {
      "label": "有効状態",
      "kind": "boolean",
      "optional": false
    },
    "adminUrl": {
      "label": "管理URL",
      "kind": "url",
      "optional": true
    },
    "employeeUrl": {
      "label": "従業員URL",
      "kind": "url",
      "optional": true
    }
  },
  "saveBillingDraft": {
    "enterpriseId": {
      "label": "企業",
      "kind": "uuid",
      "optional": false
    },
    "billingMonth": {
      "label": "請求月",
      "kind": "date",
      "optional": false
    },
    "clientRequestId": {
      "label": "送信識別情報",
      "kind": "uuid",
      "optional": false
    },
    "lines": {
      "label": "請求明細",
      "kind": "lines",
      "optional": false
    }
  },
  "issueBilling": {
    "billingMonthId": {
      "label": "請求",
      "kind": "uuid",
      "optional": false
    },
    "paymentMethod": {
      "label": "支払方法",
      "kind": "enum",
      "optional": false,
      "choices": [
        "card",
        "bank"
      ]
    }
  },
  "markBillingPaid": {
    "billingMonthId": {
      "label": "請求",
      "kind": "uuid",
      "optional": false
    },
    "paidAt": {
      "label": "入金日時",
      "kind": "timestamp",
      "optional": false
    },
    "paymentReference": {
      "label": "入金照合情報",
      "kind": "text",
      "optional": false,
      "maxLength": 200
    }
  }
};
