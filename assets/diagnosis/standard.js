(() => {
  'use strict';

  const API_ENDPOINT = 'https://api.tsunagari-jp.com/diagnosis.php';
  const app = document.getElementById('diagnosisApp');
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
    const runInfo = state.run
      ? `<div class="diagnosis-company"><span>会社・事業所</span><strong>${escapeHtml(publicCompanyName(state.run.company_name))}</strong></div>`
      : '';

    renderShell(
      `<p class="diagnosis-eyebrow">CROSS METHOD™ / ORGANIZATION VOICE</p>
       <h1>${escapeHtml(displayTitle())}</h1>
       ${runInfo}
       <p>良い・悪いを決める診断ではありません。今の状態を整理し、組織が次に確認すべき声を見つけるための入口です。</p>`,
      `<h2>回答を始める前に</h2>
       <p>感じていることに最も近い回答を選んでください。正解や不正解はありません。</p>
       <div class="diagnosis-note">回答内容は、職場や組織をより良くするための集計・改善支援に使用します。個人を責めるためのものではありません。</div>
       <div class="diagnosis-consent">
         <label><input id="diagnosisConsent" type="checkbox" ${state.consented ? 'checked' : ''}><span>回答データが診断の集計・組織改善の確認材料として使用されることに同意します。</span></label>
       </div>
       <div id="screenError" class="diagnosis-error" role="alert"></div>
       <div class="diagnosis-actions">
         <button class="diagnosis-button diagnosis-button--primary" type="button" id="startButton">同意して回答を始める</button>
       </div>`
    );

    document.getElementById('startButton').addEventListener('click', () => {
      const consent = document.getElementById('diagnosisConsent');
      if (!consent || !consent.checked) {
        showScreenError('同意欄を確認してください。');
        return;
      }
      state.consented = true;
      renderBasicInfo();
    });
  }

  function renderBasicInfo() {
    renderShell(
      `<p class="diagnosis-eyebrow">BASIC INFORMATION</p>
       <h1>${escapeHtml(displayTitle())}</h1>
       <p>${state.run ? '会社情報は専用URLから読み込まれています。' : '初回のみ会社情報を登録し、社内共有用の専用URLを発行します。'}</p>`,
      `<h2>基本情報</h2>
       <p>必須項目を入力して、設問へ進んでください。</p>
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
    renderShell(
      `<p class="diagnosis-eyebrow">COMPANY DIAGNOSIS URL</p>
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
    const artUrl = questionArtUrl(question);

    renderShell(
      `<div class="diagnosis-progress">
         <div class="diagnosis-progress__meta"><span>${current} / ${total}</span><span>${escapeHtml(displayTitle())}</span></div>
         <div class="diagnosis-progress__track"><div class="diagnosis-progress__bar" style="width:${percent}%"></div></div>
       </div>
       <p class="diagnosis-eyebrow">VOICE ${String(current).padStart(2, '0')}</p>
       <h1>今の状態に近いものを<br>選んでください</h1>`,
      `<div class="diagnosis-question ${artUrl ? '' : 'diagnosis-question--no-art'}">
         <div>
           <p class="diagnosis-question__number">QUESTION ${String(current).padStart(2, '0')}</p>
           <h2>${escapeHtml(question.question_text || '')}</h2>
           <div id="answerArea" class="diagnosis-answer"></div>
           <div id="screenError" class="diagnosis-error" role="alert"></div>
           <div class="diagnosis-actions">
             <button class="diagnosis-button diagnosis-button--secondary" type="button" id="questionBackButton">戻る</button>
             <button class="diagnosis-button diagnosis-button--primary" type="button" id="questionNextButton">${current === total ? '確認へ進む' : '次へ'}</button>
           </div>
         </div>
         ${artUrl ? `<figure class="diagnosis-question__art"><img src="${escapeAttr(artUrl)}" alt="" loading="eager" referrerpolicy="no-referrer"></figure>` : ''}
       </div>`
    );

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
    area.innerHTML = `<div class="diagnosis-choices">${choices.map((choice, index) => {
      const selected = existing && String(existing.answer_value) === String(choice.value);
      return `<button type="button" class="diagnosis-choice ${selected ? 'is-selected' : ''}" data-choice-index="${index}" aria-pressed="${selected ? 'true' : 'false'}">${escapeHtml(choice.label)}</button>`;
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
    const rows = [
      ['診断', displayTitle()],
      ['会社名・店舗名・事業所名', state.company.company_name || ''],
      ['お名前', state.company.respondent_name || ''],
      ['職種・部署', state.company.job_department || '未入力'],
      ['回答数', `${Object.keys(state.answers).length}件`]
    ];

    renderShell(
      `<p class="diagnosis-eyebrow">CONFIRM</p>
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
    renderShell(
      `<p class="diagnosis-eyebrow">COMPLETE</p>
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
    app.innerHTML = `<section class="diagnosis-shell">
      <div class="diagnosis-hero"><p class="diagnosis-eyebrow">DIAGNOSIS ERROR</p><h1>診断を表示できません</h1><p>しばらく時間を置いて、もう一度お試しください。</p></div>
      <div class="diagnosis-content"><div class="diagnosis-error is-visible" role="alert">${escapeHtml(message)}</div><div class="diagnosis-actions"><button class="diagnosis-button diagnosis-button--primary" type="button" id="reloadButton">再読み込みする</button></div></div>
    </section>`;
    document.getElementById('reloadButton').addEventListener('click', () => window.location.reload());
  }

  function renderShell(heroHtml, contentHtml) {
    app.innerHTML = `<section class="diagnosis-shell"><div class="diagnosis-hero">${heroHtml}</div><div class="diagnosis-content">${contentHtml}</div></section>`;
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
    return String(
      question.illustration_data_uri ||
      question.illustration_url ||
      state.assets.default_illustration_data_uri ||
      state.assets.default_illustration_url ||
      ''
    ).trim();
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
