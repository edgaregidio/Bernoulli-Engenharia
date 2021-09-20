function handleSubmit() {
  console.log("submit");
  var button = document.getElementById("submit");
  button.innerText = "Carregando...";

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const service = document.getElementById("service").value;
  // const environment = document.getElementById("environment").value;
  // const dateBirth = document.getElementById("dateBirth").value;
  const message = document.getElementById("message").value;

  const headers = new Headers();
  headers.append("access", "9508b1e85e9f3992c30cc7a8b9d7e1f8");
  headers.append("Content-Type", "application/json");
  fetch("/api/estimate", {
    headers,
    method: "POST",
    body: JSON.stringify({
      name,
      phone,
      email,
      service,
      // environment,
      // dateBirth,
      message,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("email").value = "";
        document.getElementById("service").value = "";
        // document.getElementById("environment").value = "";
        // document.getElementById("dateBirth").value = "";
        document.getElementById("message").value = "";
      }
      const type = res.success ? "success" : "error";
      toast(res.message, type);
      button.innerText = "Pronto? É só enviar!";
    })
    .catch((err) => {
      toast("Ocorreu um erro ao enviar a solicitação de orçamento", "error");
      button.innerText = "Pronto? É só enviar!";
    });
}

var form = document.getElementById("form-register");

form.onsubmit = () => {
  handleSubmit();
  return false;
};

const toast = (message, type = "success") => {
  const toast = document.getElementById("snackbar");
  toast.className = "show";
  toast.innerHTML = message;
  toast.style.backgroundColor = type === "success" ? "#46A049" : "#FF0000";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
};
