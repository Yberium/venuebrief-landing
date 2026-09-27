import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.117.1/+esm';

    const PROJECT_URL = 'https://bfdhjojqstopqvhdnpxy.supabase.co';
    const PUBLISHABLE_KEY = 'sb_publishable_fclEADa_lubow3KJnLrXLA_ScUaq_EK';
    const supabase = createClient(PROJECT_URL, PUBLISHABLE_KEY, {
      auth: { persistSession: true, detectSessionInUrl: true, flowType: 'pkce' },
    });

    const params = new URLSearchParams(window.location.search);
    const authorizationId = params.get('authorization_id');
    const status = document.getElementById('oauthStatus');
    const missingPanel = document.getElementById('missingPanel');
    const loginPanel = document.getElementById('loginPanel');
    const consentPanel = document.getElementById('consentPanel');
    const loginForm = document.getElementById('loginForm');
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const passwordLoginButton = document.getElementById('passwordLoginButton');
    const magicLinkButton = document.getElementById('magicLinkButton');
    const approveButton = document.getElementById('approveButton');
    const denyButton = document.getElementById('denyButton');
    const signOutButton = document.getElementById('signOutButton');

    function message(value) { status.textContent = value; }
    function show(panel) {
      for (const item of [missingPanel, loginPanel, consentPanel]) item.hidden = item !== panel;
    }
    function setDecisionBusy(busy) {
      approveButton.disabled = busy;
      denyButton.disabled = busy;
      signOutButton.disabled = busy;
    }

    async function loadAuthorization() {
      if (!authorizationId) {
        message('No authorization request was provided.');
        show(missingPanel);
        return;
      }

      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError && !/session/i.test(userError.message || '')) {
        message('Unable to verify your Yberium session.');
      }
      const user = userData?.user;
      if (!user) {
        message('Sign in to review this authorization request.');
        show(loginPanel);
        return;
      }

      const { data, error } = await supabase.auth.oauth.getAuthorizationDetails(authorizationId);
      if (error || !data) {
        message(error?.message || 'This authorization request is invalid or no longer available.');
        show(missingPanel);
        return;
      }
      if (!('authorization_id' in data)) {
        window.location.assign(data.redirect_url);
        return;
      }

      document.getElementById('clientName').textContent = `Authorize ${data.client?.name || 'external application'}`;
      document.getElementById('clientValue').textContent = data.client?.name || 'Unnamed OAuth client';
      document.getElementById('redirectValue').textContent = data.redirect_uri || 'Not provided';
      document.getElementById('accountValue').textContent = user.email || user.id;
      const scopes = String(data.scope || 'email').split(/\s+/).filter(Boolean);
      const list = document.getElementById('scopeList');
      list.replaceChildren(...scopes.map(scope => {
        const li = document.createElement('li');
        li.textContent = scope;
        return li;
      }));
      message('Review the client and requested permissions before deciding.');
      show(consentPanel);
    }

    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = loginEmail.value.trim();
      const password = loginPassword.value;
      if (!email || !password) {
        message('Enter the email and password for an existing Yberium account, or use the magic-link option.');
        return;
      }
      passwordLoginButton.disabled = true;
      magicLinkButton.disabled = true;
      message('Signing in…');
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      passwordLoginButton.disabled = false;
      magicLinkButton.disabled = false;
      if (error) {
        message(error.message);
        return;
      }
      loginPassword.value = '';
      await loadAuthorization();
    });

    magicLinkButton.addEventListener('click', async () => {
      const email = loginEmail.value.trim();
      if (!email) {
        message('Enter your work email before requesting a secure magic link.');
        loginEmail.focus();
        return;
      }
      passwordLoginButton.disabled = true;
      magicLinkButton.disabled = true;
      message('Sending a secure sign-in link…');
      const redirectTo = new URL(window.location.href);
      redirectTo.searchParams.set('authorization_id', authorizationId);
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo.toString(), shouldCreateUser: false },
      });
      passwordLoginButton.disabled = false;
      magicLinkButton.disabled = false;
      message(error ? error.message : 'Check your email and open the secure link to continue.');
    });

    approveButton.addEventListener('click', async () => {
      setDecisionBusy(true);
      message('Approving access…');
      const { data, error } = await supabase.auth.oauth.approveAuthorization(authorizationId);
      if (error || !data?.redirect_url) {
        setDecisionBusy(false);
        message(error?.message || 'Authorization could not be approved.');
        return;
      }
      window.location.assign(data.redirect_url);
    });

    denyButton.addEventListener('click', async () => {
      setDecisionBusy(true);
      message('Denying access…');
      const { data, error } = await supabase.auth.oauth.denyAuthorization(authorizationId);
      if (error || !data?.redirect_url) {
        setDecisionBusy(false);
        message(error?.message || 'Authorization could not be denied.');
        return;
      }
      window.location.assign(data.redirect_url);
    });

    signOutButton.addEventListener('click', async () => {
      setDecisionBusy(true);
      await supabase.auth.signOut();
      setDecisionBusy(false);
      message('Sign in with the account you want to authorize.');
      show(loginPanel);
    });

    loadAuthorization().catch(() => {
      message('Authorization is temporarily unavailable.');
      show(missingPanel);
    });
