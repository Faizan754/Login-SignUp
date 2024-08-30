const body = document.getElementsByTagName("body")[0];

getLayout(body.dataset.layout, body.dataset.layout === "Sign Up");

function getLayout(label, isSignUp) {
  body.innerHTML =
    `<main>
      <section id="login-background">
      </section>
      <section id="signin-page">
        <div id="signin-page-content">
          <h1>${label.toUpperCase()}</h1>
          <p>${label} with email address</p>
          <form class = 'user-form'>
          <div id="input-container">
            <i class="fa-regular fa-envelope"></i
            ><input placeholder="Yourname@gmail.com" type="email" id="email" name="email" required />
          </div>
          <div id="input-container">
            <input placeholder="Password" type="password" id="password" name="password" required />
          </div>
          ${
            isSignUp
              ? `<div id="input-container">
            <input placeholder="Confirm password" type="password" id="confirmPassword" name="confirmPassword" required />
          </div>`
              : ``
          }
          <button type="submit" id='button'>${label}</button>
          </form>
          <div id="span"><span></span></div>
          <p>
            ${isSignUp ? `Already` : `Don't`} have an account?
            <a href="../${
              isSignUp ? `LoginDashboard` : "SignupDashboard"
            }/index.html">${isSignUp ? `SignIn` : `SignUp`} here</a>
          </p>
        </div>
      </section>
    </main>
` + body.innerHTML;
}
