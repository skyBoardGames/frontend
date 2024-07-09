const apiUrl = "https://skyboardgames.com/api";

const email = document.getElementById("email");
const password = document.getElementById("password-field");

const loginFunc = async () => {
  try {
    const data = {
      email: email.value,
      password: password.value,
    };

    console.log(data);
    const logres = await fetch(`${apiUrl}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });

    const logdata = await logres.json();

    console.log(logdata);
    if (logdata.success) {
      window.location.href = "../admin_dashboard/OTP.html";
    }
    // sessionStorage.setItem("token", JSON.stringify(logdata?.data?.tokens));
  } catch (error) {
    console.error(error);
  }
};

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await loginFunc();
  });
}

const otpForm = document.getElementById("otp-form");

if (otpForm) {
  otpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await otpFunc();
  });
}

const otpFunc = async () => {
  const digit1 = document.getElementById("digit1").value;
  const digit2 = document.getElementById("digit2").value;
  const digit3 = document.getElementById("digit3").value;
  const digit4 = document.getElementById("digit4").value;
  const digit5 = document.getElementById("digit5").value;
  const otp = digit1 + digit2 + digit3 + digit4 + digit5;
  console.log(otp);

  try {
    const data = {
      email: "skyboardgames1@gmail.com",
      password: "ferdinand1234",
      otp: otp,
    };

    console.log(data);
    const logres = await fetch(`${apiUrl}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });

    const logdata = await logres.json();

    console.log(logdata);
    if (logdata.success) {
      sessionStorage.setItem("token", JSON.stringify(logdata?.data?.tokens));
      window.location.href = "../admin_dashboard/index.html";
    }
  } catch (error) {
    console.error(error);
  }
};
