function carrerPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      var roadAddr = data.roadAddress;
      var extraRoadAddr = "";

      if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
        extraRoadAddr += data.bname;
      }

      if (data.buildingName !== "" && data.apartment === "Y") {
        extraRoadAddr +=
          extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
      }

      if (extraRoadAddr !== "") {
        extraRoadAddr = " (" + extraRoadAddr + ")";
      }

      document.getElementById("user_postcode").value = data.zonecode;
      document.getElementById("user_addr").value = roadAddr;
      // document.getElementById("user_jibunAddr").value = data.jibunAddress;

      if (roadAddr !== "") {
        document.getElementById("extra_info").value = extraRoadAddr;
      } else {
        document.getElementById("extra_info").value = "";
      }

      var guideTextBox = document.getElementById("guide");
      if (data.autoRoadAddress) {
        var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
        guideTextBox.innerHTML = "(예상 도로명 주소 : " + expRoadAddr + ")";
        guideTextBox.style.display = "block";
      }
      // else if (data.autoJibunAddress) {
      //   var expJibunAddr = data.autoJibunAddress;
      //   guideTextBox.innerHTML = "(예상 지번 주소 : " + expJibunAddr + ")";
      //   guideTextBox.style.display = "block";
      // }
      else {
        guideTextBox.innerHTML = "";
        guideTextBox.style.display = "none";
      }
    },
  }).open();
}
