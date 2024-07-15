const apiUrl = "https://skyboardgames.com/api";

const emailForm = document.getElementById("emailForm");

const email = document.getElementById("email");

const sendEmailReset = async () => {
  try {
    const data = {
      email: email.value,
    };

    console.log(data);
    const coderes = await fetch(`${apiUrl}/admin/send-reset-password-mail`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });

    const response = await coderes.json();

    console.log(response);
    // sessionStorage.setItem("token", JSON.stringify(response?.data?.tokens));
  } catch (error) {
    console.error(error);
  } finally {
    if (response?.success) {
      window.location.href = "../admin_dashboard/ResetOTP.html";
    }
  }
};

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
      email: "damitigha@gmail.com",
      password: "mypassword",
      otp: otp,
    };

    console.log(data);
    const coderes = await fetch(`${apiUrl}/admin/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });

    const response = await logres.json();

    console.log(response);
    alert(response?.message);
    if (response.success) {
      window.location.href = "../admin_dashboard/login.html";
    }
  } catch (error) {
    console.error(error);
  }
};
