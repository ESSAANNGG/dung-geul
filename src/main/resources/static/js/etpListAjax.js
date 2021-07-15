let Pass = {
  init: function () {
    // 합격자
    $('#Pass').on('click', event => {
      event.preventDefault();
      this.save();
    });
  },

  save: function () {
    let data1 = new Array();

    $('input:checkbox[name=APY_CHK]:checked').each(function () {
      // 체크된 체크박스의 value 값을 가지고 온다.
      data1.push(this.value);
    });

    console.log(JSON.stringify(data1));

    // 데이터 전송 ajax
    $.ajax({
      type: 'POST',
      url: '/application/apply?pass=합격',
      data: JSON.stringify(data1),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function (result) {
        let modalList = document.querySelector('#modalList');
        let listSuccessfulApplicants = document.querySelector('#listSuccessfulApplicants');
        let listRejectedCandidates = document.querySelector('#listRejectedCandidates');
        let applyModal = document.querySelectorAll('.applyModal');
        let pageNumbers = document.querySelector('#pageNumbers');
        let passPageNumbers = document.querySelector('#passPageNumbers');
        let failPageNumbers = document.querySelector('#failPageNumbers');
        let dtoNum = document.querySelectorAll('.dtoNum');
        let dtoNumInput = document.querySelector('#dtoNumInput');
        let dNum, requestURL, requestPassURL, requestFailURL;

        $('#modalList').empty();
        $('#listSuccessfulApplicants').empty();
        $('#listRejectedCandidates').empty();
        $('#pageNumbers').empty();
        $('#passPageNumbers').empty();
        $('#failPageNumbers').empty();

        dNum = dtoNumInput.value;

        requestURL = `/application/etp/employ/list/${dNum}?page=1&pass=대기중`;
        requestPassURL = `/application/etp/employ/list/${dNum}?page=1&pass=합격`;
        requestFailURL = `/application/etp/employ/list/${dNum}?page=1&pass=불합격`;

        let request = new XMLHttpRequest();
        let requestPass = new XMLHttpRequest();
        let requestFail = new XMLHttpRequest();

        request.open('GET', requestURL);
        requestPass.open('GET', requestPassURL);
        requestFail.open('GET', requestFailURL);

        request.responseType = 'json';
        requestPass.responseType = 'json';
        requestFail.responseType = 'json';

        request.send();
        requestPass.send();
        requestFail.send();

        request.onload = function () {
          let jsonObj = request.response;
          apply(jsonObj);
        };

        requestPass.onload = function () {
          let jsonObj = requestPass.response;
          applyPass(jsonObj);
        };

        requestFail.onload = function () {
          let jsonObj = requestFail.response;
          applyFail(jsonObj);
        };

        function apply(jsonObj) {
          let applys = jsonObj['dtoList'];
          let userId;
          let introNum;
          for (let j = 0; j < applys.length; j++) {
            let myTr = document.createElement('tr');
            modalList.appendChild(myTr);

            let checkTh = document.createElement('td');
            let nameTh = document.createElement('td');
            let cvTh = document.createElement('td');
            let introTh = document.createElement('td');
            let areaTh = document.createElement('td');
            let taskTh = document.createElement('td');
            let stateTh = document.createElement('td');
            let checkBox = document.createElement('input');
            checkBox.setAttribute('type', 'checkbox');
            checkBox.setAttribute('name', 'APY_CHK');
            checkBox.setAttribute('value', applys[j].ap_id);
            let cvLink = document.createElement('a');
            let introLink = document.createElement('a');
            let cvImg = document.createElement('img');
            let introImg = document.createElement('img');
            let apId = document.createElement('td');
            let listNum = document.createElement('td');
            userId = applys[j].user_id;
            introNum = applys[j].intro_num;
            listNum.setAttribute('class', 'listNum');
            cvLink.setAttribute('href', '/application/etp/cv/read?id=' + userId);
            cvLink.setAttribute('target', '_black');
            introLink.setAttribute('href', '/application/etp/introduce/read?num=' + introNum);
            introLink.setAttribute('target', '_black');
            cvImg.setAttribute('style', 'width: 1.5em');
            cvImg.setAttribute(
              'src',
              'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zOTQuMDA3LDUwMmgtMzY0Yy0xMS4wNDYsMC0yMC04Ljk1NC0yMC0yMFYzMGMwLTExLjA0Niw4Ljk1NC0yMCwyMC0yMGgzNjRjMTEuMDQ2LDAsMjAsOC45NTQsMjAsMjANCgl2NDUyQzQxNC4wMDcsNDkzLjA0Niw0MDUuMDUzLDUwMiwzOTQuMDA3LDUwMnoiLz4NCjxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZFNjY2MzsiIGN4PSIyMTIuMDEiIGN5PSIxNDYiIHI9IjgyIi8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZDREFDOyIgZD0iTTIzOC4wMDcsMTM1LjV2Ni41YzAsMTQuMzU5LTExLjY0MSwyNi0yNiwyNmwwLDBsMCwwYy0xNC4zNTksMC0yNi0xMS42NDEtMjYtMjZ2LTYuNQ0KCWMwLTE0LjM1OSwxMS42NDEtMjYsMjYtMjZsMCwwQzIyNi4zNjYsMTA5LjUsMjM4LjAwNywxMjEuMTQxLDIzOC4wMDcsMTM1LjV6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojQTVEREZGOyIgZD0iTTIxMi4wMDcsMTY4TDIxMi4wMDcsMTY4Yy0yNS4zOCwwLTQ3LjA2NCwxNS43NjctNTUuODMyLDM4LjAzMw0KCUMxNzAuODE1LDIxOS42NTUsMTkwLjQzMiwyMjgsMjEyLjAwNywyMjhzNDEuMTkyLTguMzQ1LDU1LjgzMi0yMS45NjdDMjU5LjA3MSwxODMuNzY3LDIzNy4zODcsMTY4LDIxMi4wMDcsMTY4eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQkM1MzsiIGQ9Ik00MzYuNTc0LDE2MC41OWw1LjcxNC05Ljg5N2M4LjgzNy0xNS4zMDUsMjguNDA3LTIwLjU0OSw0My43MTMtMTEuNzEzbDAsMA0KCWMxNS4zMDUsOC44MzcsMjAuNTQ5LDI4LjQwNywxMS43MTMsNDMuNzEzTDM3MS44NzMsNDAwLjY1NmwtNTUuNDI2LTMybDU0LjI4Mi05NC4wMkw0MzYuNTc0LDE2MC41OXoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRTY2NjM7IiBkPSJNNDg2LjAwMiwxMzguOThMNDg2LjAwMiwxMzguOThjLTE1LjMwNS04LjgzNy0zNC44NzYtMy41OTMtNDMuNzEzLDExLjcxM2wtMTQuODU3LDI1LjczM2w1NS40MjYsMzINCglsMTQuODU3LTI1LjczM0M1MDYuNTUxLDE2Ny4zODgsNTAxLjMwNywxNDcuODE3LDQ4Ni4wMDIsMTM4Ljk4eiIvPg0KPHBvbHlnb24gc3R5bGU9ImZpbGw6IzlBRDhGRjsiIHBvaW50cz0iMzcxLjg3Myw0MDAuNjU2IDMwNy41ODksNDQ4IDMxNi40NDcsMzY4LjY1NiAiLz4NCjxwYXRoIGQ9Ik00MTQuMDA3LDM5OC4zMjhjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBWNDgyYzAsNS41MTQtNC40ODYsMTAtMTAsMTBoLTM2NGMtNS41MTQsMC0xMC00LjQ4Ni0xMC0xMFYzMA0KCWMwLTUuNTE0LDQuNDg2LTEwLDEwLTEwaDM2NGM1LjUxNCwwLDEwLDQuNDg2LDEwLDEwdjEwOC43NWMwLDUuNTIzLDQuNDc4LDEwLDEwLDEwczEwLTQuNDc3LDEwLTEwVjMwYzAtMTYuNTQyLTEzLjQ1OC0zMC0zMC0zMA0KCWgtMzY0Yy0xNi41NDIsMC0zMCwxMy40NTgtMzAsMzB2NDUyYzAsMTYuNTQyLDEzLjQ1OCwzMCwzMCwzMGgzNjRjMTYuNTQyLDAsMzAtMTMuNDU4LDMwLTMwdi03My42NzINCglDNDI0LjAwNyw0MDIuODA1LDQxOS41MjksMzk4LjMyOCw0MTQuMDA3LDM5OC4zMjh6Ii8+DQo8cGF0aCBkPSJNMzA0LjAwNywxNDZjMC01MC43MjktNDEuMjcxLTkyLTkyLTkycy05Miw0MS4yNzEtOTIsOTJjMCwyNi4zMTcsMTEuMTEsNTAuMDg1LDI4Ljg4Miw2Ni44NjkNCgljMC4zMzMsMC4zNTYsMC42ODcsMC42OTMsMS4wNzQsMWMxNi4zNzEsMTQuOTc5LDM4LjE1OCwyNC4xMyw2Mi4wNDMsMjQuMTNzNDUuNjcyLTkuMTUyLDYyLjA0My0yNC4xMw0KCWMwLjM4Ny0wLjMwNywwLjc0MS0wLjY0NSwxLjA3NC0xQzI5Mi44OTcsMTk2LjA4NSwzMDQuMDA3LDE3Mi4zMTcsMzA0LjAwNywxNDZ6IE0yMTIuMDA3LDc0YzM5LjcwMSwwLDcyLDMyLjI5OSw3Miw3Mg0KCWMwLDE1Ljk2Ny01LjIzMSwzMC43My0xNC4wNiw0Mi42ODNjLTcuMzc1LTEwLjkzOC0xNy41OTYtMTkuNDQ1LTI5LjQ2My0yNC42OTdjNC43MS02LjA4Nyw3LjUyMy0xMy43MTIsNy41MjMtMjEuOTg2di02LjUNCgljMC0xOS44NTEtMTYuMTQ5LTM2LTM2LTM2cy0zNiwxNi4xNDktMzYsMzZ2Ni41YzAsOC4yNzQsMi44MTMsMTUuODk5LDcuNTIzLDIxLjk4NmMtMTEuODY3LDUuMjUyLTIyLjA4OCwxMy43NTktMjkuNDYzLDI0LjY5Nw0KCWMtOC44MjktMTEuOTUzLTE0LjA2LTI2LjcxNi0xNC4wNi00Mi42ODNDMTQwLjAwNywxMDYuMjk5LDE3Mi4zMDYsNzQsMjEyLjAwNyw3NHogTTE5Ni4wMDcsMTQydi02LjVjMC04LjgyMiw3LjE3OC0xNiwxNi0xNg0KCXMxNiw3LjE3OCwxNiwxNnY2LjVjMCw4LjgyMi03LjE3OCwxNi0xNiwxNlMxOTYuMDA3LDE1MC44MjIsMTk2LjAwNywxNDJ6IE0xNjguNTE2LDIwMy4zMzINCgljOC43ODktMTUuNTg1LDI1LjE5LTI1LjMzMiw0My40OTEtMjUuMzMyczM0LjcwMiw5Ljc0Nyw0My40OTEsMjUuMzMyQzI0My40MDUsMjEyLjUyOCwyMjguMzM2LDIxOCwyMTIuMDA3LDIxOA0KCVMxODAuNjA4LDIxMi41MjgsMTY4LjUxNiwyMDMuMzMyeiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsNDM4aC01NGMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGg1NGM1LjUyMiwwLDEwLTQuNDc3LDEwLTEwUzI3MS41MjksNDM4LDI2Ni4wMDcsNDM4eiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsMzgyaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwzODIsMjY2LjAwNywzODJ6Ii8+DQo8cGF0aCBkPSJNMjY2LjAwNywzMjZoLTE0MmMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGgxNDJjNS41MjIsMCwxMC00LjQ3NywxMC0xMFMyNzEuNTI5LDMyNiwyNjYuMDA3LDMyNnoiLz4NCjxwYXRoIGQ9Ik04OC4zNjYsMjcyLjkzYy0xLjg1OS0xLjg2LTQuNDM5LTIuOTMtNy4wNzktMi45M2MtMi42MzEsMC01LjIxMSwxLjA3LTcuMDcsMi45M2MtMS44NiwxLjg2LTIuOTMsNC40NC0yLjkzLDcuMDcNCglzMS4wNjksNS4yMSwyLjkzLDcuMDdjMS44NywxLjg2LDQuNDM5LDIuOTMsNy4wNywyLjkzYzIuNjQsMCw1LjIxLTEuMDcsNy4wNzktMi45M2MxLjg2LTEuODYsMi45MzEtNC40NCwyLjkzMS03LjA3DQoJUzkwLjIyNywyNzQuNzksODguMzY2LDI3Mi45M3oiLz4NCjxwYXRoIGQ9Ik04OC4zNjYsMzI4LjkzYy0xLjg2OS0xLjg2LTQuNDM5LTIuOTMtNy4wNzktMi45M2MtMi42MzEsMC01LjIsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3DQoJczEuMDY5LDUuMjEsMi45Myw3LjA3YzEuODcsMS44Niw0LjQzOSwyLjkzLDcuMDcsMi45M2MyLjY0LDAsNS4yMS0xLjA3LDcuMDc5LTIuOTNjMS44Ni0xLjg2LDIuOTMxLTQuNDQsMi45MzEtNy4wNw0KCVM5MC4yMjcsMzMwLjc5LDg4LjM2NiwzMjguOTN6Ii8+DQo8cGF0aCBkPSJNODEuMjg3LDM4MmMtMi42MzEsMC01LjIsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3czEuMDY5LDUuMjEsMi45Myw3LjA3DQoJYzEuODU5LDEuODYsNC40MzksMi45Myw3LjA3LDIuOTNjMi42NCwwLDUuMjItMS4wNyw3LjA3OS0yLjkzYzEuODYtMS44NiwyLjkzMS00LjQ0LDIuOTMxLTcuMDdzLTEuMDctNS4yMS0yLjkzMS03LjA3DQoJQzg2LjQ5NywzODMuMDcsODMuOTI3LDM4Miw4MS4yODcsMzgyeiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsMjcwaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwyNzAsMjY2LjAwNywyNzB6Ii8+DQo8cGF0aCBkPSJNNDkxLjAwMiwxMzAuMzJjLTkuNzE1LTUuNjA5LTIxLjAzMy03LjA5OS0zMS44NzEtNC4xOTZjLTEwLjgzNiwyLjkwNC0xOS44OTQsOS44NTQtMjUuNTAyLDE5LjU2OUwzMDcuNzg3LDM2My42NTYNCgljLTAuNjg5LDEuMTk1LTEuMTI1LDIuNTItMS4yNzgsMy44OTFsLTguODU4LDc5LjM0NGMtMC40NCwzLjk0OCwxLjQ5OCw3Ljc4Myw0LjkzOCw5Ljc3YzEuNTUzLDAuODk2LDMuMjc4LDEuMzQsNC45OTksMS4zNA0KCWMyLjA5MiwwLDQuMTc2LTAuNjU1LDUuOTMxLTEuOTQ4bDY0LjI4NC00Ny4zNDRjMS4xMTEtMC44MTgsMi4wNDEtMS44NTcsMi43My0zLjA1MmwxMjUuODQxLTIxNy45NjMNCglDNTE3Ljk1NCwxNjcuNjM4LDUxMS4wNTgsMTQxLjksNDkxLjAwMiwxMzAuMzJ6IE0zMjQuNjg5LDM4NC45NjJsMjguOTQyLDE2LjcxbC0zMy41NjgsMjQuNzIyTDMyNC42ODksMzg0Ljk2MnogTTM2OC4yMTMsMzg2Ljk5Ng0KCWwtMzguMTA1LTIybDEwMC45ODUtMTc0LjkxbDM4LjEwNSwyMkwzNjguMjEzLDM4Ni45OTZ6IE00ODkuMDU0LDE3Ny42OTNsLTkuODU3LDE3LjA3M2wtMzguMTA1LTIybDkuODU3LTE3LjA3Mw0KCWMyLjkzOC01LjA4OSw3LjY4Mi04LjcyOSwxMy4zNTgtMTAuMjVjNS42NzgtMS41MjIsMTEuNjA2LTAuNzQsMTYuNjk0LDIuMTk4YzUuMDg5LDIuOTM4LDguNzI5LDcuNjgyLDEwLjI1LDEzLjM1OA0KCUM0OTIuNzcyLDE2Ni42NzUsNDkxLjk5MiwxNzIuNjA0LDQ4OS4wNTQsMTc3LjY5M3oiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K'
            );
            introImg.setAttribute('style', 'width: 1.5em');
            introImg.setAttribute(
              'src',
              'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQzg3MDsiIGQ9Ik00NDMsNTAyLjA2M0gxNDljLTExLjA0NiwwLTIwLTguOTU0LTIwLTIwdi0zNzJjMC0xMS4wNDYsOC45NTQtMjAsMjAtMjBoMjk0DQoJYzExLjA0NiwwLDIwLDguOTU0LDIwLDIwdjM3MkM0NjMsNDkzLjEwOSw0NTQuMDQ2LDUwMi4wNjMsNDQzLDUwMi4wNjN6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZEQUEwOyIgZD0iTTQwMyw0NjIuMDYzSDEwOWMtMTEuMDQ2LDAtMjAtOC45NTQtMjAtMjB2LTM3MmMwLTExLjA0Niw4Ljk1NC0yMCwyMC0yMGgyOTQNCgljMTEuMDQ2LDAsMjAsOC45NTQsMjAsMjB2MzcyQzQyMyw0NTMuMTA5LDQxNC4wNDYsNDYyLjA2Myw0MDMsNDYyLjA2M3oiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzYyLjkzNyw0MjJoLTI5NGMtMTEuMDQ2LDAtMjAtOC45NTQtMjAtMjBWMzBjMC0xMS4wNDYsOC45NTQtMjAsMjAtMjBoMjk0YzExLjA0NiwwLDIwLDguOTU0LDIwLDIwDQoJdjM3MkMzODIuOTM3LDQxMy4wNDYsMzczLjk4Miw0MjIsMzYyLjkzNyw0MjJ6Ii8+DQo8cmVjdCB4PSIxMDQuOTQiIHk9Ijg0IiBzdHlsZT0iZmlsbDojQkFFRTgzOyIgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2Ii8+DQo8cGF0aCBkPSJNMzYyLjkzNyw0MzJoLTI5NGMtMTYuNTQyLDAtMzAtMTMuNDU4LTMwLTMwVjIxNi4zMzNjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMGM1LjUyMiwwLDEwLDQuNDc3LDEwLDEwVjQwMg0KCWMwLDUuNTE0LDQuNDg2LDEwLDEwLDEwaDI5NGM1LjUxNCwwLDEwLTQuNDg2LDEwLTEwVjMwYzAtNS41MTQtNC40ODYtMTAtMTAtMTBoLTI5NGMtNS41MTQsMC0xMCw0LjQ4Ni0xMCwxMHYxMDINCgljMCw1LjUyMy00LjQ3OCwxMC0xMCwxMGMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMFYzMGMwLTE2LjU0MiwxMy40NTgtMzAsMzAtMzBoMjk0YzE2LjU0MiwwLDMwLDEzLjQ1OCwzMCwzMHYzNzINCglDMzkyLjkzNyw0MTguNTQyLDM3OS40NzksNDMyLDM2Mi45MzcsNDMyeiIvPg0KPHBhdGggZD0iTTQ4LjkzNywxODYuNzhjLTIuNjMsMC01LjIxLTEuMDctNy4wNy0yLjkzYy0xLjg2LTEuODctMi45My00LjQ0LTIuOTMtNy4wOGMwLTIuNjIsMS4wNjktNS4yLDIuOTMtNy4wNw0KCWMxLjg2LTEuODYsNC40NC0yLjkyLDcuMDctMi45MmMyLjYzLDAsNS4yMSwxLjA2LDcuMDY5LDIuOTJjMS44NiwxLjg3LDIuOTMxLDQuNDQsMi45MzEsNy4wN2MwLDIuNjQtMS4wNyw1LjIyLTIuOTMxLDcuMDgNCglDNTQuMTQ2LDE4NS43MSw1MS41NjYsMTg2Ljc4LDQ4LjkzNywxODYuNzh6Ii8+DQo8cGF0aCBkPSJNODguOTk2LDQ3Mi4wNmMtMi42MywwLTUuMjEtMS4wNi03LjA2OS0yLjkzYy0xLjg2LTEuODYtMi45MzEtNC40My0yLjkzMS03LjA3YzAtMi42MywxLjA3LTUuMjEsMi45MzEtNy4wNw0KCWMxLjg1OS0xLjg2LDQuNDM5LTIuOTMsNy4wNjktMi45M2MyLjY0MSwwLDUuMjEsMS4wNyw3LjA3LDIuOTNzMi45Myw0LjQ0LDIuOTMsNy4wN2MwLDIuNjQtMS4wNjksNS4yMS0yLjkzLDcuMDcNCglDOTQuMjA2LDQ3MSw5MS42MzcsNDcyLjA2LDg4Ljk5Niw0NzIuMDZ6Ii8+DQo8cGF0aCBkPSJNNDAzLDQ3Mi4wNjNIMTI5Yy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDI3NGM1LjUxNCwwLDEwLTQuNDg2LDEwLTEwdi0zOTJjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMA0KCXMxMCw0LjQ3NywxMCwxMHYzOTJDNDMzLDQ1OC42MDUsNDE5LjU0Miw0NzIuMDYzLDQwMyw0NzIuMDYzeiIvPg0KPHBhdGggZD0iTTQ0My4wNjMsNTEyaC0zMTRjLTUuNTIyLDAtMTAtNC40NzctMTAtMTBzNC40NzgtMTAsMTAtMTBoMzE0YzUuNTE0LDAsMTAtNC40ODYsMTAtMTBWOTBjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMA0KCXMxMCw0LjQ3NywxMCwxMHYzOTJDNDczLjA2Myw0OTguNTQyLDQ1OS42MDUsNTEyLDQ0My4wNjMsNTEyeiIvPg0KPHBhdGggZD0iTTIwMC45MzcsMTkwaC05NmMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMFY4NGMwLTUuNTIzLDQuNDc4LTEwLDEwLTEwaDk2YzUuNTIyLDAsMTAsNC40NzcsMTAsMTB2OTYNCglDMjEwLjkzNywxODUuNTIzLDIwNi40NTksMTkwLDIwMC45MzcsMTkweiBNMTE0LjkzNywxNzBoNzZWOTRoLTc2VjE3MHoiLz4NCjxwYXRoIGQ9Ik0xMjguMDM1LDI4Ni4xMjdMMTI4LjAzNSwyODYuMTI3Yy0yLjY1MiwwLTUuMTk1LTEuMDU0LTcuMDcxLTIuOTI5bC0xOS40MzItMTkuNDMyYy0zLjkwNS0zLjkwNS0zLjkwNS0xMC4yMzcsMC0xNC4xNDINCgljMy45MDgtMy45MDQsMTAuMjM4LTMuOTA1LDE0LjE0MywwbDEyLjM2LDEyLjM2MWwyNi41ODMtMjYuNTgzYzMuOTA3LTMuOTA1LDEwLjIzNy0zLjkwNCwxNC4xNDMsMA0KCWMzLjkwNSwzLjkwNSwzLjkwNSwxMC4yMzcsMCwxNC4xNDJsLTMzLjY1NCwzMy42NTRDMTMzLjIzLDI4NS4wNzMsMTMwLjY4OCwyODYuMTI3LDEyOC4wMzUsMjg2LjEyN3oiLz4NCjxwYXRoIGQ9Ik0zMzIuNjA0LDI2OUgyMTUuOTM3Yy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDExNi42NjdjNS41MjIsMCwxMCw0LjQ3NywxMCwxMA0KCUMzNDIuNjA0LDI2NC41MjMsMzM4LjEyNiwyNjksMzMyLjYwNCwyNjl6Ii8+DQo8cGF0aCBkPSJNMzI2LjkzNyw5NGgtNzBjLTUuNTIyLDAtMTAtNC40NzctMTAtMTBzNC40NzgtMTAsMTAtMTBoNzBjNS41MjIsMCwxMCw0LjQ3NywxMCwxMFMzMzIuNDU5LDk0LDMyNi45MzcsOTR6Ii8+DQo8cGF0aCBkPSJNMzI2LjkzNywxNDJoLTcwYy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDcwYzUuNTIyLDAsMTAsNC40NzcsMTAsMTANCglDMzM2LjkzNywxMzcuNTIzLDMzMi40NTksMTQyLDMyNi45MzcsMTQyeiIvPg0KPHBhdGggZD0iTTMyNi45MzcsMTkwaC03MGMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3OC0xMCwxMC0xMGg3MGM1LjUyMiwwLDEwLDQuNDc3LDEwLDEwUzMzMi40NTksMTkwLDMyNi45MzcsMTkweiIvPg0KPHBhdGggZD0iTTEyOC4wMzUsMzYyLjQ5NEwxMjguMDM1LDM2Mi40OTRjLTIuNjUyLDAtNS4xOTUtMS4wNTQtNy4wNzEtMi45MjlsLTE5LjQzMi0xOS40MzJjLTMuOTA1LTMuOTA1LTMuOTA1LTEwLjIzNywwLTE0LjE0Mg0KCWMzLjkwOC0zLjkwNCwxMC4yMzgtMy45MDUsMTQuMTQzLDBsMTIuMzYsMTIuMzYxbDI2LjU4My0yNi41ODNjMy45MDctMy45MDUsMTAuMjM3LTMuOTA0LDE0LjE0MywwDQoJYzMuOTA1LDMuOTA1LDMuOTA1LDEwLjIzNywwLDE0LjE0MmwtMzMuNjU0LDMzLjY1NEMxMzMuMjMsMzYxLjQ0LDEzMC42ODgsMzYyLjQ5NCwxMjguMDM1LDM2Mi40OTR6Ii8+DQo8cGF0aCBkPSJNMzMyLjYwNCwzNDVIMjE1LjkzN2MtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3OC0xMCwxMC0xMGgxMTYuNjY3YzUuNTIyLDAsMTAsNC40NzcsMTAsMTBTMzM4LjEyNiwzNDUsMzMyLjYwNCwzNDV6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=='
            );
            apId.setAttribute('style', 'display:none;');
            listNum.setAttribute('style', 'display:none;');

            nameTh.textContent = applys[j].user_name;
            areaTh.textContent = applys[j].ap_area;
            taskTh.textContent = applys[j].ap_task;
            stateTh.textContent = applys[j].ap_pass;
            apId.textContent = applys[j].ap_id;
            listNum.textContent = dNum;

            myTr.appendChild(checkTh);
            myTr.appendChild(nameTh);
            myTr.appendChild(cvTh);
            myTr.appendChild(introTh);
            myTr.appendChild(areaTh);
            myTr.appendChild(taskTh);
            myTr.appendChild(stateTh);
            myTr.appendChild(apId);
            myTr.appendChild(listNum);
            checkTh.appendChild(checkBox);
            cvTh.appendChild(cvLink);
            cvLink.appendChild(cvImg);
            introTh.appendChild(introLink);
            introLink.appendChild(introImg);
          }
          //페이지네이션
          let totalPage = jsonObj['totalPage'];
          let pageNumbers = document.querySelector('#pageNumbers');
          let pageNumber;
          for (let p = 0; p < totalPage; p++) {
            let page = document.createElement('a');
            page.setAttribute('class', 'page-link');
            page.textContent = p + 1;

            pageNumbers.appendChild(page);

            pageNumber = document.querySelectorAll('.page-link');

            pageNumber[p].addEventListener('click', () => {
              $('#modalList').empty();
              $('.page-link').removeClass('active');

              pageNumber[p].classList.add('active');

              requestURL = `/application/etp/employ/list/${dNum}?page=${p + 1}&pass=대기중`;

              let request = new XMLHttpRequest();
              request.open('GET', requestURL);

              request.responseType = 'json';
              request.send();

              request.onload = function () {
                let jsonObj = request.response;
                apply2(jsonObj);
              };

              function apply2(jsonObj) {
                let applys = jsonObj['dtoList'];
                let userId;
                let introNum;
                for (let j = 0; j < applys.length; j++) {
                  let myTr = document.createElement('tr');
                  modalList.appendChild(myTr);

                  let checkTh = document.createElement('td');
                  let nameTh = document.createElement('td');
                  let cvTh = document.createElement('td');
                  let introTh = document.createElement('td');
                  let areaTh = document.createElement('td');
                  let taskTh = document.createElement('td');
                  let stateTh = document.createElement('td');
                  let checkBox = document.createElement('input');
                  checkBox.setAttribute('type', 'checkbox');
                  checkBox.setAttribute('name', 'APY_CHK');
                  checkBox.setAttribute('value', applys[j].ap_id);
                  let cvLink = document.createElement('a');
                  let introLink = document.createElement('a');
                  let cvImg = document.createElement('img');
                  let introImg = document.createElement('img');
                  let apId = document.createElement('td');
                  let listNum = document.createElement('td');
                  userId = applys[j].user_id;
                  introNum = applys[j].intro_num;
                  listNum.setAttribute('class', 'listNum');
                  cvLink.setAttribute('href', '/application/etp/cv/read?id=' + userId);
                  cvLink.setAttribute('target', '_black');
                  introLink.setAttribute('href', '/application/etp/introduce/read?num=' + introNum);
                  introLink.setAttribute('target', '_black');
                  cvImg.setAttribute('style', 'width: 1.5em');
                  cvImg.setAttribute(
                    'src',
                    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zOTQuMDA3LDUwMmgtMzY0Yy0xMS4wNDYsMC0yMC04Ljk1NC0yMC0yMFYzMGMwLTExLjA0Niw4Ljk1NC0yMCwyMC0yMGgzNjRjMTEuMDQ2LDAsMjAsOC45NTQsMjAsMjANCgl2NDUyQzQxNC4wMDcsNDkzLjA0Niw0MDUuMDUzLDUwMiwzOTQuMDA3LDUwMnoiLz4NCjxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZFNjY2MzsiIGN4PSIyMTIuMDEiIGN5PSIxNDYiIHI9IjgyIi8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZDREFDOyIgZD0iTTIzOC4wMDcsMTM1LjV2Ni41YzAsMTQuMzU5LTExLjY0MSwyNi0yNiwyNmwwLDBsMCwwYy0xNC4zNTksMC0yNi0xMS42NDEtMjYtMjZ2LTYuNQ0KCWMwLTE0LjM1OSwxMS42NDEtMjYsMjYtMjZsMCwwQzIyNi4zNjYsMTA5LjUsMjM4LjAwNywxMjEuMTQxLDIzOC4wMDcsMTM1LjV6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojQTVEREZGOyIgZD0iTTIxMi4wMDcsMTY4TDIxMi4wMDcsMTY4Yy0yNS4zOCwwLTQ3LjA2NCwxNS43NjctNTUuODMyLDM4LjAzMw0KCUMxNzAuODE1LDIxOS42NTUsMTkwLjQzMiwyMjgsMjEyLjAwNywyMjhzNDEuMTkyLTguMzQ1LDU1LjgzMi0yMS45NjdDMjU5LjA3MSwxODMuNzY3LDIzNy4zODcsMTY4LDIxMi4wMDcsMTY4eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQkM1MzsiIGQ9Ik00MzYuNTc0LDE2MC41OWw1LjcxNC05Ljg5N2M4LjgzNy0xNS4zMDUsMjguNDA3LTIwLjU0OSw0My43MTMtMTEuNzEzbDAsMA0KCWMxNS4zMDUsOC44MzcsMjAuNTQ5LDI4LjQwNywxMS43MTMsNDMuNzEzTDM3MS44NzMsNDAwLjY1NmwtNTUuNDI2LTMybDU0LjI4Mi05NC4wMkw0MzYuNTc0LDE2MC41OXoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRTY2NjM7IiBkPSJNNDg2LjAwMiwxMzguOThMNDg2LjAwMiwxMzguOThjLTE1LjMwNS04LjgzNy0zNC44NzYtMy41OTMtNDMuNzEzLDExLjcxM2wtMTQuODU3LDI1LjczM2w1NS40MjYsMzINCglsMTQuODU3LTI1LjczM0M1MDYuNTUxLDE2Ny4zODgsNTAxLjMwNywxNDcuODE3LDQ4Ni4wMDIsMTM4Ljk4eiIvPg0KPHBvbHlnb24gc3R5bGU9ImZpbGw6IzlBRDhGRjsiIHBvaW50cz0iMzcxLjg3Myw0MDAuNjU2IDMwNy41ODksNDQ4IDMxNi40NDcsMzY4LjY1NiAiLz4NCjxwYXRoIGQ9Ik00MTQuMDA3LDM5OC4zMjhjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBWNDgyYzAsNS41MTQtNC40ODYsMTAtMTAsMTBoLTM2NGMtNS41MTQsMC0xMC00LjQ4Ni0xMC0xMFYzMA0KCWMwLTUuNTE0LDQuNDg2LTEwLDEwLTEwaDM2NGM1LjUxNCwwLDEwLDQuNDg2LDEwLDEwdjEwOC43NWMwLDUuNTIzLDQuNDc4LDEwLDEwLDEwczEwLTQuNDc3LDEwLTEwVjMwYzAtMTYuNTQyLTEzLjQ1OC0zMC0zMC0zMA0KCWgtMzY0Yy0xNi41NDIsMC0zMCwxMy40NTgtMzAsMzB2NDUyYzAsMTYuNTQyLDEzLjQ1OCwzMCwzMCwzMGgzNjRjMTYuNTQyLDAsMzAtMTMuNDU4LDMwLTMwdi03My42NzINCglDNDI0LjAwNyw0MDIuODA1LDQxOS41MjksMzk4LjMyOCw0MTQuMDA3LDM5OC4zMjh6Ii8+DQo8cGF0aCBkPSJNMzA0LjAwNywxNDZjMC01MC43MjktNDEuMjcxLTkyLTkyLTkycy05Miw0MS4yNzEtOTIsOTJjMCwyNi4zMTcsMTEuMTEsNTAuMDg1LDI4Ljg4Miw2Ni44NjkNCgljMC4zMzMsMC4zNTYsMC42ODcsMC42OTMsMS4wNzQsMWMxNi4zNzEsMTQuOTc5LDM4LjE1OCwyNC4xMyw2Mi4wNDMsMjQuMTNzNDUuNjcyLTkuMTUyLDYyLjA0My0yNC4xMw0KCWMwLjM4Ny0wLjMwNywwLjc0MS0wLjY0NSwxLjA3NC0xQzI5Mi44OTcsMTk2LjA4NSwzMDQuMDA3LDE3Mi4zMTcsMzA0LjAwNywxNDZ6IE0yMTIuMDA3LDc0YzM5LjcwMSwwLDcyLDMyLjI5OSw3Miw3Mg0KCWMwLDE1Ljk2Ny01LjIzMSwzMC43My0xNC4wNiw0Mi42ODNjLTcuMzc1LTEwLjkzOC0xNy41OTYtMTkuNDQ1LTI5LjQ2My0yNC42OTdjNC43MS02LjA4Nyw3LjUyMy0xMy43MTIsNy41MjMtMjEuOTg2di02LjUNCgljMC0xOS44NTEtMTYuMTQ5LTM2LTM2LTM2cy0zNiwxNi4xNDktMzYsMzZ2Ni41YzAsOC4yNzQsMi44MTMsMTUuODk5LDcuNTIzLDIxLjk4NmMtMTEuODY3LDUuMjUyLTIyLjA4OCwxMy43NTktMjkuNDYzLDI0LjY5Nw0KCWMtOC44MjktMTEuOTUzLTE0LjA2LTI2LjcxNi0xNC4wNi00Mi42ODNDMTQwLjAwNywxMDYuMjk5LDE3Mi4zMDYsNzQsMjEyLjAwNyw3NHogTTE5Ni4wMDcsMTQydi02LjVjMC04LjgyMiw3LjE3OC0xNiwxNi0xNg0KCXMxNiw3LjE3OCwxNiwxNnY2LjVjMCw4LjgyMi03LjE3OCwxNi0xNiwxNlMxOTYuMDA3LDE1MC44MjIsMTk2LjAwNywxNDJ6IE0xNjguNTE2LDIwMy4zMzINCgljOC43ODktMTUuNTg1LDI1LjE5LTI1LjMzMiw0My40OTEtMjUuMzMyczM0LjcwMiw5Ljc0Nyw0My40OTEsMjUuMzMyQzI0My40MDUsMjEyLjUyOCwyMjguMzM2LDIxOCwyMTIuMDA3LDIxOA0KCVMxODAuNjA4LDIxMi41MjgsMTY4LjUxNiwyMDMuMzMyeiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsNDM4aC01NGMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGg1NGM1LjUyMiwwLDEwLTQuNDc3LDEwLTEwUzI3MS41MjksNDM4LDI2Ni4wMDcsNDM4eiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsMzgyaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwzODIsMjY2LjAwNywzODJ6Ii8+DQo8cGF0aCBkPSJNMjY2LjAwNywzMjZoLTE0MmMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGgxNDJjNS41MjIsMCwxMC00LjQ3NywxMC0xMFMyNzEuNTI5LDMyNiwyNjYuMDA3LDMyNnoiLz4NCjxwYXRoIGQ9Ik04OC4zNjYsMjcyLjkzYy0xLjg1OS0xLjg2LTQuNDM5LTIuOTMtNy4wNzktMi45M2MtMi42MzEsMC01LjIxMSwxLjA3LTcuMDcsMi45M2MtMS44NiwxLjg2LTIuOTMsNC40NC0yLjkzLDcuMDcNCglzMS4wNjksNS4yMSwyLjkzLDcuMDdjMS44NywxLjg2LDQuNDM5LDIuOTMsNy4wNywyLjkzYzIuNjQsMCw1LjIxLTEuMDcsNy4wNzktMi45M2MxLjg2LTEuODYsMi45MzEtNC40NCwyLjkzMS03LjA3DQoJUzkwLjIyNywyNzQuNzksODguMzY2LDI3Mi45M3oiLz4NCjxwYXRoIGQ9Ik04OC4zNjYsMzI4LjkzYy0xLjg2OS0xLjg2LTQuNDM5LTIuOTMtNy4wNzktMi45M2MtMi42MzEsMC01LjIsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3DQoJczEuMDY5LDUuMjEsMi45Myw3LjA3YzEuODcsMS44Niw0LjQzOSwyLjkzLDcuMDcsMi45M2MyLjY0LDAsNS4yMS0xLjA3LDcuMDc5LTIuOTNjMS44Ni0xLjg2LDIuOTMxLTQuNDQsMi45MzEtNy4wNw0KCVM5MC4yMjcsMzMwLjc5LDg4LjM2NiwzMjguOTN6Ii8+DQo8cGF0aCBkPSJNODEuMjg3LDM4MmMtMi42MzEsMC01LjIsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3czEuMDY5LDUuMjEsMi45Myw3LjA3DQoJYzEuODU5LDEuODYsNC40MzksMi45Myw3LjA3LDIuOTNjMi42NCwwLDUuMjItMS4wNyw3LjA3OS0yLjkzYzEuODYtMS44NiwyLjkzMS00LjQ0LDIuOTMxLTcuMDdzLTEuMDctNS4yMS0yLjkzMS03LjA3DQoJQzg2LjQ5NywzODMuMDcsODMuOTI3LDM4Miw4MS4yODcsMzgyeiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsMjcwaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwyNzAsMjY2LjAwNywyNzB6Ii8+DQo8cGF0aCBkPSJNNDkxLjAwMiwxMzAuMzJjLTkuNzE1LTUuNjA5LTIxLjAzMy03LjA5OS0zMS44NzEtNC4xOTZjLTEwLjgzNiwyLjkwNC0xOS44OTQsOS44NTQtMjUuNTAyLDE5LjU2OUwzMDcuNzg3LDM2My42NTYNCgljLTAuNjg5LDEuMTk1LTEuMTI1LDIuNTItMS4yNzgsMy44OTFsLTguODU4LDc5LjM0NGMtMC40NCwzLjk0OCwxLjQ5OCw3Ljc4Myw0LjkzOCw5Ljc3YzEuNTUzLDAuODk2LDMuMjc4LDEuMzQsNC45OTksMS4zNA0KCWMyLjA5MiwwLDQuMTc2LTAuNjU1LDUuOTMxLTEuOTQ4bDY0LjI4NC00Ny4zNDRjMS4xMTEtMC44MTgsMi4wNDEtMS44NTcsMi43My0zLjA1MmwxMjUuODQxLTIxNy45NjMNCglDNTE3Ljk1NCwxNjcuNjM4LDUxMS4wNTgsMTQxLjksNDkxLjAwMiwxMzAuMzJ6IE0zMjQuNjg5LDM4NC45NjJsMjguOTQyLDE2LjcxbC0zMy41NjgsMjQuNzIyTDMyNC42ODksMzg0Ljk2MnogTTM2OC4yMTMsMzg2Ljk5Ng0KCWwtMzguMTA1LTIybDEwMC45ODUtMTc0LjkxbDM4LjEwNSwyMkwzNjguMjEzLDM4Ni45OTZ6IE00ODkuMDU0LDE3Ny42OTNsLTkuODU3LDE3LjA3M2wtMzguMTA1LTIybDkuODU3LTE3LjA3Mw0KCWMyLjkzOC01LjA4OSw3LjY4Mi04LjcyOSwxMy4zNTgtMTAuMjVjNS42NzgtMS41MjIsMTEuNjA2LTAuNzQsMTYuNjk0LDIuMTk4YzUuMDg5LDIuOTM4LDguNzI5LDcuNjgyLDEwLjI1LDEzLjM1OA0KCUM0OTIuNzcyLDE2Ni42NzUsNDkxLjk5MiwxNzIuNjA0LDQ4OS4wNTQsMTc3LjY5M3oiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K'
                  );
                  introImg.setAttribute('style', 'width: 1.5em');
                  introImg.setAttribute(
                    'src',
                    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQzg3MDsiIGQ9Ik00NDMsNTAyLjA2M0gxNDljLTExLjA0NiwwLTIwLTguOTU0LTIwLTIwdi0zNzJjMC0xMS4wNDYsOC45NTQtMjAsMjAtMjBoMjk0DQoJYzExLjA0NiwwLDIwLDguOTU0LDIwLDIwdjM3MkM0NjMsNDkzLjEwOSw0NTQuMDQ2LDUwMi4wNjMsNDQzLDUwMi4wNjN6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZEQUEwOyIgZD0iTTQwMyw0NjIuMDYzSDEwOWMtMTEuMDQ2LDAtMjAtOC45NTQtMjAtMjB2LTM3MmMwLTExLjA0Niw4Ljk1NC0yMCwyMC0yMGgyOTQNCgljMTEuMDQ2LDAsMjAsOC45NTQsMjAsMjB2MzcyQzQyMyw0NTMuMTA5LDQxNC4wNDYsNDYyLjA2Myw0MDMsNDYyLjA2M3oiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzYyLjkzNyw0MjJoLTI5NGMtMTEuMDQ2LDAtMjAtOC45NTQtMjAtMjBWMzBjMC0xMS4wNDYsOC45NTQtMjAsMjAtMjBoMjk0YzExLjA0NiwwLDIwLDguOTU0LDIwLDIwDQoJdjM3MkMzODIuOTM3LDQxMy4wNDYsMzczLjk4Miw0MjIsMzYyLjkzNyw0MjJ6Ii8+DQo8cmVjdCB4PSIxMDQuOTQiIHk9Ijg0IiBzdHlsZT0iZmlsbDojQkFFRTgzOyIgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2Ii8+DQo8cGF0aCBkPSJNMzYyLjkzNyw0MzJoLTI5NGMtMTYuNTQyLDAtMzAtMTMuNDU4LTMwLTMwVjIxNi4zMzNjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMGM1LjUyMiwwLDEwLDQuNDc3LDEwLDEwVjQwMg0KCWMwLDUuNTE0LDQuNDg2LDEwLDEwLDEwaDI5NGM1LjUxNCwwLDEwLTQuNDg2LDEwLTEwVjMwYzAtNS41MTQtNC40ODYtMTAtMTAtMTBoLTI5NGMtNS41MTQsMC0xMCw0LjQ4Ni0xMCwxMHYxMDINCgljMCw1LjUyMy00LjQ3OCwxMC0xMCwxMGMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMFYzMGMwLTE2LjU0MiwxMy40NTgtMzAsMzAtMzBoMjk0YzE2LjU0MiwwLDMwLDEzLjQ1OCwzMCwzMHYzNzINCglDMzkyLjkzNyw0MTguNTQyLDM3OS40NzksNDMyLDM2Mi45MzcsNDMyeiIvPg0KPHBhdGggZD0iTTQ4LjkzNywxODYuNzhjLTIuNjMsMC01LjIxLTEuMDctNy4wNy0yLjkzYy0xLjg2LTEuODctMi45My00LjQ0LTIuOTMtNy4wOGMwLTIuNjIsMS4wNjktNS4yLDIuOTMtNy4wNw0KCWMxLjg2LTEuODYsNC40NC0yLjkyLDcuMDctMi45MmMyLjYzLDAsNS4yMSwxLjA2LDcuMDY5LDIuOTJjMS44NiwxLjg3LDIuOTMxLDQuNDQsMi45MzEsNy4wN2MwLDIuNjQtMS4wNyw1LjIyLTIuOTMxLDcuMDgNCglDNTQuMTQ2LDE4NS43MSw1MS41NjYsMTg2Ljc4LDQ4LjkzNywxODYuNzh6Ii8+DQo8cGF0aCBkPSJNODguOTk2LDQ3Mi4wNmMtMi42MywwLTUuMjEtMS4wNi03LjA2OS0yLjkzYy0xLjg2LTEuODYtMi45MzEtNC40My0yLjkzMS03LjA3YzAtMi42MywxLjA3LTUuMjEsMi45MzEtNy4wNw0KCWMxLjg1OS0xLjg2LDQuNDM5LTIuOTMsNy4wNjktMi45M2MyLjY0MSwwLDUuMjEsMS4wNyw3LjA3LDIuOTNzMi45Myw0LjQ0LDIuOTMsNy4wN2MwLDIuNjQtMS4wNjksNS4yMS0yLjkzLDcuMDcNCglDOTQuMjA2LDQ3MSw5MS42MzcsNDcyLjA2LDg4Ljk5Niw0NzIuMDZ6Ii8+DQo8cGF0aCBkPSJNNDAzLDQ3Mi4wNjNIMTI5Yy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDI3NGM1LjUxNCwwLDEwLTQuNDg2LDEwLTEwdi0zOTJjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMA0KCXMxMCw0LjQ3NywxMCwxMHYzOTJDNDMzLDQ1OC42MDUsNDE5LjU0Miw0NzIuMDYzLDQwMyw0NzIuMDYzeiIvPg0KPHBhdGggZD0iTTQ0My4wNjMsNTEyaC0zMTRjLTUuNTIyLDAtMTAtNC40NzctMTAtMTBzNC40NzgtMTAsMTAtMTBoMzE0YzUuNTE0LDAsMTAtNC40ODYsMTAtMTBWOTBjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMA0KCXMxMCw0LjQ3NywxMCwxMHYzOTJDNDczLjA2Myw0OTguNTQyLDQ1OS42MDUsNTEyLDQ0My4wNjMsNTEyeiIvPg0KPHBhdGggZD0iTTIwMC45MzcsMTkwaC05NmMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMFY4NGMwLTUuNTIzLDQuNDc4LTEwLDEwLTEwaDk2YzUuNTIyLDAsMTAsNC40NzcsMTAsMTB2OTYNCglDMjEwLjkzNywxODUuNTIzLDIwNi40NTksMTkwLDIwMC45MzcsMTkweiBNMTE0LjkzNywxNzBoNzZWOTRoLTc2VjE3MHoiLz4NCjxwYXRoIGQ9Ik0xMjguMDM1LDI4Ni4xMjdMMTI4LjAzNSwyODYuMTI3Yy0yLjY1MiwwLTUuMTk1LTEuMDU0LTcuMDcxLTIuOTI5bC0xOS40MzItMTkuNDMyYy0zLjkwNS0zLjkwNS0zLjkwNS0xMC4yMzcsMC0xNC4xNDINCgljMy45MDgtMy45MDQsMTAuMjM4LTMuOTA1LDE0LjE0MywwbDEyLjM2LDEyLjM2MWwyNi41ODMtMjYuNTgzYzMuOTA3LTMuOTA1LDEwLjIzNy0zLjkwNCwxNC4xNDMsMA0KCWMzLjkwNSwzLjkwNSwzLjkwNSwxMC4yMzcsMCwxNC4xNDJsLTMzLjY1NCwzMy42NTRDMTMzLjIzLDI4NS4wNzMsMTMwLjY4OCwyODYuMTI3LDEyOC4wMzUsMjg2LjEyN3oiLz4NCjxwYXRoIGQ9Ik0zMzIuNjA0LDI2OUgyMTUuOTM3Yy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDExNi42NjdjNS41MjIsMCwxMCw0LjQ3NywxMCwxMA0KCUMzNDIuNjA0LDI2NC41MjMsMzM4LjEyNiwyNjksMzMyLjYwNCwyNjl6Ii8+DQo8cGF0aCBkPSJNMzI2LjkzNyw5NGgtNzBjLTUuNTIyLDAtMTAtNC40NzctMTAtMTBzNC40NzgtMTAsMTAtMTBoNzBjNS41MjIsMCwxMCw0LjQ3NywxMCwxMFMzMzIuNDU5LDk0LDMyNi45MzcsOTR6Ii8+DQo8cGF0aCBkPSJNMzI2LjkzNywxNDJoLTcwYy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDcwYzUuNTIyLDAsMTAsNC40NzcsMTAsMTANCglDMzM2LjkzNywxMzcuNTIzLDMzMi40NTksMTQyLDMyNi45MzcsMTQyeiIvPg0KPHBhdGggZD0iTTMyNi45MzcsMTkwaC03MGMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3OC0xMCwxMC0xMGg3MGM1LjUyMiwwLDEwLDQuNDc3LDEwLDEwUzMzMi40NTksMTkwLDMyNi45MzcsMTkweiIvPg0KPHBhdGggZD0iTTEyOC4wMzUsMzYyLjQ5NEwxMjguMDM1LDM2Mi40OTRjLTIuNjUyLDAtNS4xOTUtMS4wNTQtNy4wNzEtMi45MjlsLTE5LjQzMi0xOS40MzJjLTMuOTA1LTMuOTA1LTMuOTA1LTEwLjIzNywwLTE0LjE0Mg0KCWMzLjkwOC0zLjkwNCwxMC4yMzgtMy45MDUsMTQuMTQzLDBsMTIuMzYsMTIuMzYxbDI2LjU4My0yNi41ODNjMy45MDctMy45MDUsMTAuMjM3LTMuOTA0LDE0LjE0MywwDQoJYzMuOTA1LDMuOTA1LDMuOTA1LDEwLjIzNywwLDE0LjE0MmwtMzMuNjU0LDMzLjY1NEMxMzMuMjMsMzYxLjQ0LDEzMC42ODgsMzYyLjQ5NCwxMjguMDM1LDM2Mi40OTR6Ii8+DQo8cGF0aCBkPSJNMzMyLjYwNCwzNDVIMjE1LjkzN2MtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3OC0xMCwxMC0xMGgxMTYuNjY3YzUuNTIyLDAsMTAsNC40NzcsMTAsMTBTMzM4LjEyNiwzNDUsMzMyLjYwNCwzNDV6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=='
                  );
                  apId.setAttribute('style', 'display:none;');
                  listNum.setAttribute('style', 'display:none;');

                  nameTh.textContent = applys[j].user_name;
                  areaTh.textContent = applys[j].ap_area;
                  taskTh.textContent = applys[j].ap_task;
                  stateTh.textContent = applys[j].ap_pass;
                  apId.textContent = applys[j].ap_id;
                  listNum.textContent = dNum;

                  myTr.appendChild(checkTh);
                  myTr.appendChild(nameTh);
                  myTr.appendChild(cvTh);
                  myTr.appendChild(introTh);
                  myTr.appendChild(areaTh);
                  myTr.appendChild(taskTh);
                  myTr.appendChild(stateTh);
                  myTr.appendChild(apId);
                  myTr.appendChild(listNum);
                  checkTh.appendChild(checkBox);
                  cvTh.appendChild(cvLink);
                  cvLink.appendChild(cvImg);
                  introTh.appendChild(introLink);
                  introLink.appendChild(introImg);
                }
              }
            });
          }
        }

        function applyPass(jsonObj) {
          let applys = jsonObj['dtoList'];
          let userId;
          let introNum;
          for (let j = 0; j < applys.length; j++) {
            let myTr = document.createElement('tr');
            listSuccessfulApplicants.appendChild(myTr);

            let nameTh = document.createElement('td');
            let cvTh = document.createElement('td');
            let introTh = document.createElement('td');
            let areaTh = document.createElement('td');
            let taskTh = document.createElement('td');
            let checkBox = document.createElement('input');
            let cvLink = document.createElement('a');
            let introLink = document.createElement('a');
            let cvImg = document.createElement('img');
            let introImg = document.createElement('img');
            let apId = document.createElement('td');
            let listNum = document.createElement('td');
            userId = applys[j].user_id;
            introNum = applys[j].intro_num;
            listNum.setAttribute('class', 'listNum');
            cvLink.setAttribute('href', '/application/etp/cv/read?id=' + userId);
            cvLink.setAttribute('target', '_black');
            introLink.setAttribute('href', '/application/etp/introduce/read?num=' + introNum);
            introLink.setAttribute('target', '_black');
            cvImg.setAttribute('style', 'width: 1.5em');
            cvImg.setAttribute(
              'src',
              'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zOTQuMDA3LDUwMmgtMzY0Yy0xMS4wNDYsMC0yMC04Ljk1NC0yMC0yMFYzMGMwLTExLjA0Niw4Ljk1NC0yMCwyMC0yMGgzNjRjMTEuMDQ2LDAsMjAsOC45NTQsMjAsMjANCgl2NDUyQzQxNC4wMDcsNDkzLjA0Niw0MDUuMDUzLDUwMiwzOTQuMDA3LDUwMnoiLz4NCjxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZFNjY2MzsiIGN4PSIyMTIuMDEiIGN5PSIxNDYiIHI9IjgyIi8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZDREFDOyIgZD0iTTIzOC4wMDcsMTM1LjV2Ni41YzAsMTQuMzU5LTExLjY0MSwyNi0yNiwyNmwwLDBsMCwwYy0xNC4zNTksMC0yNi0xMS42NDEtMjYtMjZ2LTYuNQ0KCWMwLTE0LjM1OSwxMS42NDEtMjYsMjYtMjZsMCwwQzIyNi4zNjYsMTA5LjUsMjM4LjAwNywxMjEuMTQxLDIzOC4wMDcsMTM1LjV6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojQTVEREZGOyIgZD0iTTIxMi4wMDcsMTY4TDIxMi4wMDcsMTY4Yy0yNS4zOCwwLTQ3LjA2NCwxNS43NjctNTUuODMyLDM4LjAzMw0KCUMxNzAuODE1LDIxOS42NTUsMTkwLjQzMiwyMjgsMjEyLjAwNywyMjhzNDEuMTkyLTguMzQ1LDU1LjgzMi0yMS45NjdDMjU5LjA3MSwxODMuNzY3LDIzNy4zODcsMTY4LDIxMi4wMDcsMTY4eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQkM1MzsiIGQ9Ik00MzYuNTc0LDE2MC41OWw1LjcxNC05Ljg5N2M4LjgzNy0xNS4zMDUsMjguNDA3LTIwLjU0OSw0My43MTMtMTEuNzEzbDAsMA0KCWMxNS4zMDUsOC44MzcsMjAuNTQ5LDI4LjQwNywxMS43MTMsNDMuNzEzTDM3MS44NzMsNDAwLjY1NmwtNTUuNDI2LTMybDU0LjI4Mi05NC4wMkw0MzYuNTc0LDE2MC41OXoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRTY2NjM7IiBkPSJNNDg2LjAwMiwxMzguOThMNDg2LjAwMiwxMzguOThjLTE1LjMwNS04LjgzNy0zNC44NzYtMy41OTMtNDMuNzEzLDExLjcxM2wtMTQuODU3LDI1LjczM2w1NS40MjYsMzINCglsMTQuODU3LTI1LjczM0M1MDYuNTUxLDE2Ny4zODgsNTAxLjMwNywxNDcuODE3LDQ4Ni4wMDIsMTM4Ljk4eiIvPg0KPHBvbHlnb24gc3R5bGU9ImZpbGw6IzlBRDhGRjsiIHBvaW50cz0iMzcxLjg3Myw0MDAuNjU2IDMwNy41ODksNDQ4IDMxNi40NDcsMzY4LjY1NiAiLz4NCjxwYXRoIGQ9Ik00MTQuMDA3LDM5OC4zMjhjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBWNDgyYzAsNS41MTQtNC40ODYsMTAtMTAsMTBoLTM2NGMtNS41MTQsMC0xMC00LjQ4Ni0xMC0xMFYzMA0KCWMwLTUuNTE0LDQuNDg2LTEwLDEwLTEwaDM2NGM1LjUxNCwwLDEwLDQuNDg2LDEwLDEwdjEwOC43NWMwLDUuNTIzLDQuNDc4LDEwLDEwLDEwczEwLTQuNDc3LDEwLTEwVjMwYzAtMTYuNTQyLTEzLjQ1OC0zMC0zMC0zMA0KCWgtMzY0Yy0xNi41NDIsMC0zMCwxMy40NTgtMzAsMzB2NDUyYzAsMTYuNTQyLDEzLjQ1OCwzMCwzMCwzMGgzNjRjMTYuNTQyLDAsMzAtMTMuNDU4LDMwLTMwdi03My42NzINCglDNDI0LjAwNyw0MDIuODA1LDQxOS41MjksMzk4LjMyOCw0MTQuMDA3LDM5OC4zMjh6Ii8+DQo8cGF0aCBkPSJNMzA0LjAwNywxNDZjMC01MC43MjktNDEuMjcxLTkyLTkyLTkycy05Miw0MS4yNzEtOTIsOTJjMCwyNi4zMTcsMTEuMTEsNTAuMDg1LDI4Ljg4Miw2Ni44NjkNCgljMC4zMzMsMC4zNTYsMC42ODcsMC42OTMsMS4wNzQsMWMxNi4zNzEsMTQuOTc5LDM4LjE1OCwyNC4xMyw2Mi4wNDMsMjQuMTNzNDUuNjcyLTkuMTUyLDYyLjA0My0yNC4xMw0KCWMwLjM4Ny0wLjMwNywwLjc0MS0wLjY0NSwxLjA3NC0xQzI5Mi44OTcsMTk2LjA4NSwzMDQuMDA3LDE3Mi4zMTcsMzA0LjAwNywxNDZ6IE0yMTIuMDA3LDc0YzM5LjcwMSwwLDcyLDMyLjI5OSw3Miw3Mg0KCWMwLDE1Ljk2Ny01LjIzMSwzMC43My0xNC4wNiw0Mi42ODNjLTcuMzc1LTEwLjkzOC0xNy41OTYtMTkuNDQ1LTI5LjQ2My0yNC42OTdjNC43MS02LjA4Nyw3LjUyMy0xMy43MTIsNy41MjMtMjEuOTg2di02LjUNCgljMC0xOS44NTEtMTYuMTQ5LTM2LTM2LTM2cy0zNiwxNi4xNDktMzYsMzZ2Ni41YzAsOC4yNzQsMi44MTMsMTUuODk5LDcuNTIzLDIxLjk4NmMtMTEuODY3LDUuMjUyLTIyLjA4OCwxMy43NTktMjkuNDYzLDI0LjY5Nw0KCWMtOC44MjktMTEuOTUzLTE0LjA2LTI2LjcxNi0xNC4wNi00Mi42ODNDMTQwLjAwNywxMDYuMjk5LDE3Mi4zMDYsNzQsMjEyLjAwNyw3NHogTTE5Ni4wMDcsMTQydi02LjVjMC04LjgyMiw3LjE3OC0xNiwxNi0xNg0KCXMxNiw3LjE3OCwxNiwxNnY2LjVjMCw4LjgyMi03LjE3OCwxNi0xNiwxNlMxOTYuMDA3LDE1MC44MjIsMTk2LjAwNywxNDJ6IE0xNjguNTE2LDIwMy4zMzINCgljOC43ODktMTUuNTg1LDI1LjE5LTI1LjMzMiw0My40OTEtMjUuMzMyczM0LjcwMiw5Ljc0Nyw0My40OTEsMjUuMzMyQzI0My40MDUsMjEyLjUyOCwyMjguMzM2LDIxOCwyMTIuMDA3LDIxOA0KCVMxODAuNjA4LDIxMi41MjgsMTY4LjUxNiwyMDMuMzMyeiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsNDM4aC01NGMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGg1NGM1LjUyMiwwLDEwLTQuNDc3LDEwLTEwUzI3MS41MjksNDM4LDI2Ni4wMDcsNDM4eiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsMzgyaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwzODIsMjY2LjAwNywzODJ6Ii8+DQo8cGF0aCBkPSJNMjY2LjAwNywzMjZoLTE0MmMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGgxNDJjNS41MjIsMCwxMC00LjQ3NywxMC0xMFMyNzEuNTI5LDMyNiwyNjYuMDA3LDMyNnoiLz4NCjxwYXRoIGQ9Ik04OC4zNjYsMjcyLjkzYy0xLjg1OS0xLjg2LTQuNDM5LTIuOTMtNy4wNzktMi45M2MtMi42MzEsMC01LjIxMSwxLjA3LTcuMDcsMi45M2MtMS44NiwxLjg2LTIuOTMsNC40NC0yLjkzLDcuMDcNCglzMS4wNjksNS4yMSwyLjkzLDcuMDdjMS44NywxLjg2LDQuNDM5LDIuOTMsNy4wNywyLjkzYzIuNjQsMCw1LjIxLTEuMDcsNy4wNzktMi45M2MxLjg2LTEuODYsMi45MzEtNC40NCwyLjkzMS03LjA3DQoJUzkwLjIyNywyNzQuNzksODguMzY2LDI3Mi45M3oiLz4NCjxwYXRoIGQ9Ik04OC4zNjYsMzI4LjkzYy0xLjg2OS0xLjg2LTQuNDM5LTIuOTMtNy4wNzktMi45M2MtMi42MzEsMC01LjIsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3DQoJczEuMDY5LDUuMjEsMi45Myw3LjA3YzEuODcsMS44Niw0LjQzOSwyLjkzLDcuMDcsMi45M2MyLjY0LDAsNS4yMS0xLjA3LDcuMDc5LTIuOTNjMS44Ni0xLjg2LDIuOTMxLTQuNDQsMi45MzEtNy4wNw0KCVM5MC4yMjcsMzMwLjc5LDg4LjM2NiwzMjguOTN6Ii8+DQo8cGF0aCBkPSJNODEuMjg3LDM4MmMtMi42MzEsMC01LjIsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3czEuMDY5LDUuMjEsMi45Myw3LjA3DQoJYzEuODU5LDEuODYsNC40MzksMi45Myw3LjA3LDIuOTNjMi42NCwwLDUuMjItMS4wNyw3LjA3OS0yLjkzYzEuODYtMS44NiwyLjkzMS00LjQ0LDIuOTMxLTcuMDdzLTEuMDctNS4yMS0yLjkzMS03LjA3DQoJQzg2LjQ5NywzODMuMDcsODMuOTI3LDM4Miw4MS4yODcsMzgyeiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsMjcwaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwyNzAsMjY2LjAwNywyNzB6Ii8+DQo8cGF0aCBkPSJNNDkxLjAwMiwxMzAuMzJjLTkuNzE1LTUuNjA5LTIxLjAzMy03LjA5OS0zMS44NzEtNC4xOTZjLTEwLjgzNiwyLjkwNC0xOS44OTQsOS44NTQtMjUuNTAyLDE5LjU2OUwzMDcuNzg3LDM2My42NTYNCgljLTAuNjg5LDEuMTk1LTEuMTI1LDIuNTItMS4yNzgsMy44OTFsLTguODU4LDc5LjM0NGMtMC40NCwzLjk0OCwxLjQ5OCw3Ljc4Myw0LjkzOCw5Ljc3YzEuNTUzLDAuODk2LDMuMjc4LDEuMzQsNC45OTksMS4zNA0KCWMyLjA5MiwwLDQuMTc2LTAuNjU1LDUuOTMxLTEuOTQ4bDY0LjI4NC00Ny4zNDRjMS4xMTEtMC44MTgsMi4wNDEtMS44NTcsMi43My0zLjA1MmwxMjUuODQxLTIxNy45NjMNCglDNTE3Ljk1NCwxNjcuNjM4LDUxMS4wNTgsMTQxLjksNDkxLjAwMiwxMzAuMzJ6IE0zMjQuNjg5LDM4NC45NjJsMjguOTQyLDE2LjcxbC0zMy41NjgsMjQuNzIyTDMyNC42ODksMzg0Ljk2MnogTTM2OC4yMTMsMzg2Ljk5Ng0KCWwtMzguMTA1LTIybDEwMC45ODUtMTc0LjkxbDM4LjEwNSwyMkwzNjguMjEzLDM4Ni45OTZ6IE00ODkuMDU0LDE3Ny42OTNsLTkuODU3LDE3LjA3M2wtMzguMTA1LTIybDkuODU3LTE3LjA3Mw0KCWMyLjkzOC01LjA4OSw3LjY4Mi04LjcyOSwxMy4zNTgtMTAuMjVjNS42NzgtMS41MjIsMTEuNjA2LTAuNzQsMTYuNjk0LDIuMTk4YzUuMDg5LDIuOTM4LDguNzI5LDcuNjgyLDEwLjI1LDEzLjM1OA0KCUM0OTIuNzcyLDE2Ni42NzUsNDkxLjk5MiwxNzIuNjA0LDQ4OS4wNTQsMTc3LjY5M3oiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K'
            );
            introImg.setAttribute('style', 'width: 1.5em');
            introImg.setAttribute(
              'src',
              'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQzg3MDsiIGQ9Ik00NDMsNTAyLjA2M0gxNDljLTExLjA0NiwwLTIwLTguOTU0LTIwLTIwdi0zNzJjMC0xMS4wNDYsOC45NTQtMjAsMjAtMjBoMjk0DQoJYzExLjA0NiwwLDIwLDguOTU0LDIwLDIwdjM3MkM0NjMsNDkzLjEwOSw0NTQuMDQ2LDUwMi4wNjMsNDQzLDUwMi4wNjN6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZEQUEwOyIgZD0iTTQwMyw0NjIuMDYzSDEwOWMtMTEuMDQ2LDAtMjAtOC45NTQtMjAtMjB2LTM3MmMwLTExLjA0Niw4Ljk1NC0yMCwyMC0yMGgyOTQNCgljMTEuMDQ2LDAsMjAsOC45NTQsMjAsMjB2MzcyQzQyMyw0NTMuMTA5LDQxNC4wNDYsNDYyLjA2Myw0MDMsNDYyLjA2M3oiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzYyLjkzNyw0MjJoLTI5NGMtMTEuMDQ2LDAtMjAtOC45NTQtMjAtMjBWMzBjMC0xMS4wNDYsOC45NTQtMjAsMjAtMjBoMjk0YzExLjA0NiwwLDIwLDguOTU0LDIwLDIwDQoJdjM3MkMzODIuOTM3LDQxMy4wNDYsMzczLjk4Miw0MjIsMzYyLjkzNyw0MjJ6Ii8+DQo8cmVjdCB4PSIxMDQuOTQiIHk9Ijg0IiBzdHlsZT0iZmlsbDojQkFFRTgzOyIgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2Ii8+DQo8cGF0aCBkPSJNMzYyLjkzNyw0MzJoLTI5NGMtMTYuNTQyLDAtMzAtMTMuNDU4LTMwLTMwVjIxNi4zMzNjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMGM1LjUyMiwwLDEwLDQuNDc3LDEwLDEwVjQwMg0KCWMwLDUuNTE0LDQuNDg2LDEwLDEwLDEwaDI5NGM1LjUxNCwwLDEwLTQuNDg2LDEwLTEwVjMwYzAtNS41MTQtNC40ODYtMTAtMTAtMTBoLTI5NGMtNS41MTQsMC0xMCw0LjQ4Ni0xMCwxMHYxMDINCgljMCw1LjUyMy00LjQ3OCwxMC0xMCwxMGMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMFYzMGMwLTE2LjU0MiwxMy40NTgtMzAsMzAtMzBoMjk0YzE2LjU0MiwwLDMwLDEzLjQ1OCwzMCwzMHYzNzINCglDMzkyLjkzNyw0MTguNTQyLDM3OS40NzksNDMyLDM2Mi45MzcsNDMyeiIvPg0KPHBhdGggZD0iTTQ4LjkzNywxODYuNzhjLTIuNjMsMC01LjIxLTEuMDctNy4wNy0yLjkzYy0xLjg2LTEuODctMi45My00LjQ0LTIuOTMtNy4wOGMwLTIuNjIsMS4wNjktNS4yLDIuOTMtNy4wNw0KCWMxLjg2LTEuODYsNC40NC0yLjkyLDcuMDctMi45MmMyLjYzLDAsNS4yMSwxLjA2LDcuMDY5LDIuOTJjMS44NiwxLjg3LDIuOTMxLDQuNDQsMi45MzEsNy4wN2MwLDIuNjQtMS4wNyw1LjIyLTIuOTMxLDcuMDgNCglDNTQuMTQ2LDE4NS43MSw1MS41NjYsMTg2Ljc4LDQ4LjkzNywxODYuNzh6Ii8+DQo8cGF0aCBkPSJNODguOTk2LDQ3Mi4wNmMtMi42MywwLTUuMjEtMS4wNi03LjA2OS0yLjkzYy0xLjg2LTEuODYtMi45MzEtNC40My0yLjkzMS03LjA3YzAtMi42MywxLjA3LTUuMjEsMi45MzEtNy4wNw0KCWMxLjg1OS0xLjg2LDQuNDM5LTIuOTMsNy4wNjktMi45M2MyLjY0MSwwLDUuMjEsMS4wNyw3LjA3LDIuOTNzMi45Myw0LjQ0LDIuOTMsNy4wN2MwLDIuNjQtMS4wNjksNS4yMS0yLjkzLDcuMDcNCglDOTQuMjA2LDQ3MSw5MS42MzcsNDcyLjA2LDg4Ljk5Niw0NzIuMDZ6Ii8+DQo8cGF0aCBkPSJNNDAzLDQ3Mi4wNjNIMTI5Yy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDI3NGM1LjUxNCwwLDEwLTQuNDg2LDEwLTEwdi0zOTJjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMA0KCXMxMCw0LjQ3NywxMCwxMHYzOTJDNDMzLDQ1OC42MDUsNDE5LjU0Miw0NzIuMDYzLDQwMyw0NzIuMDYzeiIvPg0KPHBhdGggZD0iTTQ0My4wNjMsNTEyaC0zMTRjLTUuNTIyLDAtMTAtNC40NzctMTAtMTBzNC40NzgtMTAsMTAtMTBoMzE0YzUuNTE0LDAsMTAtNC40ODYsMTAtMTBWOTBjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMA0KCXMxMCw0LjQ3NywxMCwxMHYzOTJDNDczLjA2Myw0OTguNTQyLDQ1OS42MDUsNTEyLDQ0My4wNjMsNTEyeiIvPg0KPHBhdGggZD0iTTIwMC45MzcsMTkwaC05NmMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMFY4NGMwLTUuNTIzLDQuNDc4LTEwLDEwLTEwaDk2YzUuNTIyLDAsMTAsNC40NzcsMTAsMTB2OTYNCglDMjEwLjkzNywxODUuNTIzLDIwNi40NTksMTkwLDIwMC45MzcsMTkweiBNMTE0LjkzNywxNzBoNzZWOTRoLTc2VjE3MHoiLz4NCjxwYXRoIGQ9Ik0xMjguMDM1LDI4Ni4xMjdMMTI4LjAzNSwyODYuMTI3Yy0yLjY1MiwwLTUuMTk1LTEuMDU0LTcuMDcxLTIuOTI5bC0xOS40MzItMTkuNDMyYy0zLjkwNS0zLjkwNS0zLjkwNS0xMC4yMzcsMC0xNC4xNDINCgljMy45MDgtMy45MDQsMTAuMjM4LTMuOTA1LDE0LjE0MywwbDEyLjM2LDEyLjM2MWwyNi41ODMtMjYuNTgzYzMuOTA3LTMuOTA1LDEwLjIzNy0zLjkwNCwxNC4xNDMsMA0KCWMzLjkwNSwzLjkwNSwzLjkwNSwxMC4yMzcsMCwxNC4xNDJsLTMzLjY1NCwzMy42NTRDMTMzLjIzLDI4NS4wNzMsMTMwLjY4OCwyODYuMTI3LDEyOC4wMzUsMjg2LjEyN3oiLz4NCjxwYXRoIGQ9Ik0zMzIuNjA0LDI2OUgyMTUuOTM3Yy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDExNi42NjdjNS41MjIsMCwxMCw0LjQ3NywxMCwxMA0KCUMzNDIuNjA0LDI2NC41MjMsMzM4LjEyNiwyNjksMzMyLjYwNCwyNjl6Ii8+DQo8cGF0aCBkPSJNMzI2LjkzNyw5NGgtNzBjLTUuNTIyLDAtMTAtNC40NzctMTAtMTBzNC40NzgtMTAsMTAtMTBoNzBjNS41MjIsMCwxMCw0LjQ3NywxMCwxMFMzMzIuNDU5LDk0LDMyNi45MzcsOTR6Ii8+DQo8cGF0aCBkPSJNMzI2LjkzNywxNDJoLTcwYy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDcwYzUuNTIyLDAsMTAsNC40NzcsMTAsMTANCglDMzM2LjkzNywxMzcuNTIzLDMzMi40NTksMTQyLDMyNi45MzcsMTQyeiIvPg0KPHBhdGggZD0iTTMyNi45MzcsMTkwaC03MGMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3OC0xMCwxMC0xMGg3MGM1LjUyMiwwLDEwLDQuNDc3LDEwLDEwUzMzMi40NTksMTkwLDMyNi45MzcsMTkweiIvPg0KPHBhdGggZD0iTTEyOC4wMzUsMzYyLjQ5NEwxMjguMDM1LDM2Mi40OTRjLTIuNjUyLDAtNS4xOTUtMS4wNTQtNy4wNzEtMi45MjlsLTE5LjQzMi0xOS40MzJjLTMuOTA1LTMuOTA1LTMuOTA1LTEwLjIzNywwLTE0LjE0Mg0KCWMzLjkwOC0zLjkwNCwxMC4yMzgtMy45MDUsMTQuMTQzLDBsMTIuMzYsMTIuMzYxbDI2LjU4My0yNi41ODNjMy45MDctMy45MDUsMTAuMjM3LTMuOTA0LDE0LjE0MywwDQoJYzMuOTA1LDMuOTA1LDMuOTA1LDEwLjIzNywwLDE0LjE0MmwtMzMuNjU0LDMzLjY1NEMxMzMuMjMsMzYxLjQ0LDEzMC42ODgsMzYyLjQ5NCwxMjguMDM1LDM2Mi40OTR6Ii8+DQo8cGF0aCBkPSJNMzMyLjYwNCwzNDVIMjE1LjkzN2MtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3OC0xMCwxMC0xMGgxMTYuNjY3YzUuNTIyLDAsMTAsNC40NzcsMTAsMTBTMzM4LjEyNiwzNDUsMzMyLjYwNCwzNDV6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=='
            );
            apId.setAttribute('style', 'display:none;');
            listNum.setAttribute('style', 'display:none;');

            nameTh.textContent = applys[j].user_name;
            areaTh.textContent = applys[j].ap_area;
            taskTh.textContent = applys[j].ap_task;
            apId.textContent = applys[j].ap_id;
            listNum.textContent = dNum;

            myTr.appendChild(nameTh);
            myTr.appendChild(cvTh);
            myTr.appendChild(introTh);
            myTr.appendChild(areaTh);
            myTr.appendChild(taskTh);
            myTr.appendChild(apId);
            myTr.appendChild(listNum);
            cvTh.appendChild(cvLink);
            cvLink.appendChild(cvImg);
            introTh.appendChild(introLink);
            introLink.appendChild(introImg);
          }
          //페이지네이션
          let totalPage = jsonObj['totalPage'];
          let pageNumbers = document.querySelector('#passPageNumbers');
          let pageNumber;
          for (let p = 0; p < totalPage; p++) {
            let page = document.createElement('a');
            page.setAttribute('class', 'Passpage-link');
            page.textContent = p + 1;

            pageNumbers.appendChild(page);

            pageNumber = document.querySelectorAll('.Passpage-link');

            pageNumber[p].addEventListener('click', () => {
              $('#listSuccessfulApplicants').empty();
              $('.Passpage-link').removeClass('active');

              pageNumber[p].classList.add('active');

              requestPassURL = `/application/etp/employ/list/${dNum}?page=${p + 1}&pass=합격`;

              let requestPass = new XMLHttpRequest();
              requestPass.open('GET', requestPassURL);

              requestPass.responseType = 'json';
              requestPass.send();

              requestPass.onload = function () {
                let jsonObj = requestPass.response;
                applyPass2(jsonObj);
              };

              function applyPass2(jsonObj) {
                let applys = jsonObj['dtoList'];
                let userId;
                let introNum;
                for (let j = 0; j < applys.length; j++) {
                  let myTr = document.createElement('tr');
                  listSuccessfulApplicants.appendChild(myTr);

                  let nameTh = document.createElement('td');
                  let cvTh = document.createElement('td');
                  let introTh = document.createElement('td');
                  let areaTh = document.createElement('td');
                  let taskTh = document.createElement('td');
                  let cvLink = document.createElement('a');
                  let introLink = document.createElement('a');
                  let cvImg = document.createElement('img');
                  let introImg = document.createElement('img');
                  let apId = document.createElement('td');
                  let listNum = document.createElement('td');
                  userId = applys[j].user_id;
                  introNum = applys[j].intro_num;
                  listNum.setAttribute('class', 'listNum');
                  cvLink.setAttribute('href', '/application/etp/cv/read?id=' + userId);
                  cvLink.setAttribute('target', '_black');
                  introLink.setAttribute('href', '/application/etp/introduce/read?num=' + introNum);
                  introLink.setAttribute('target', '_black');
                  cvImg.setAttribute('style', 'width: 1.5em');
                  cvImg.setAttribute(
                    'src',
                    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zOTQuMDA3LDUwMmgtMzY0Yy0xMS4wNDYsMC0yMC04Ljk1NC0yMC0yMFYzMGMwLTExLjA0Niw4Ljk1NC0yMCwyMC0yMGgzNjRjMTEuMDQ2LDAsMjAsOC45NTQsMjAsMjANCgl2NDUyQzQxNC4wMDcsNDkzLjA0Niw0MDUuMDUzLDUwMiwzOTQuMDA3LDUwMnoiLz4NCjxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZFNjY2MzsiIGN4PSIyMTIuMDEiIGN5PSIxNDYiIHI9IjgyIi8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZDREFDOyIgZD0iTTIzOC4wMDcsMTM1LjV2Ni41YzAsMTQuMzU5LTExLjY0MSwyNi0yNiwyNmwwLDBsMCwwYy0xNC4zNTksMC0yNi0xMS42NDEtMjYtMjZ2LTYuNQ0KCWMwLTE0LjM1OSwxMS42NDEtMjYsMjYtMjZsMCwwQzIyNi4zNjYsMTA5LjUsMjM4LjAwNywxMjEuMTQxLDIzOC4wMDcsMTM1LjV6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojQTVEREZGOyIgZD0iTTIxMi4wMDcsMTY4TDIxMi4wMDcsMTY4Yy0yNS4zOCwwLTQ3LjA2NCwxNS43NjctNTUuODMyLDM4LjAzMw0KCUMxNzAuODE1LDIxOS42NTUsMTkwLjQzMiwyMjgsMjEyLjAwNywyMjhzNDEuMTkyLTguMzQ1LDU1LjgzMi0yMS45NjdDMjU5LjA3MSwxODMuNzY3LDIzNy4zODcsMTY4LDIxMi4wMDcsMTY4eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQkM1MzsiIGQ9Ik00MzYuNTc0LDE2MC41OWw1LjcxNC05Ljg5N2M4LjgzNy0xNS4zMDUsMjguNDA3LTIwLjU0OSw0My43MTMtMTEuNzEzbDAsMA0KCWMxNS4zMDUsOC44MzcsMjAuNTQ5LDI4LjQwNywxMS43MTMsNDMuNzEzTDM3MS44NzMsNDAwLjY1NmwtNTUuNDI2LTMybDU0LjI4Mi05NC4wMkw0MzYuNTc0LDE2MC41OXoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRTY2NjM7IiBkPSJNNDg2LjAwMiwxMzguOThMNDg2LjAwMiwxMzguOThjLTE1LjMwNS04LjgzNy0zNC44NzYtMy41OTMtNDMuNzEzLDExLjcxM2wtMTQuODU3LDI1LjczM2w1NS40MjYsMzINCglsMTQuODU3LTI1LjczM0M1MDYuNTUxLDE2Ny4zODgsNTAxLjMwNywxNDcuODE3LDQ4Ni4wMDIsMTM4Ljk4eiIvPg0KPHBvbHlnb24gc3R5bGU9ImZpbGw6IzlBRDhGRjsiIHBvaW50cz0iMzcxLjg3Myw0MDAuNjU2IDMwNy41ODksNDQ4IDMxNi40NDcsMzY4LjY1NiAiLz4NCjxwYXRoIGQ9Ik00MTQuMDA3LDM5OC4zMjhjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBWNDgyYzAsNS41MTQtNC40ODYsMTAtMTAsMTBoLTM2NGMtNS41MTQsMC0xMC00LjQ4Ni0xMC0xMFYzMA0KCWMwLTUuNTE0LDQuNDg2LTEwLDEwLTEwaDM2NGM1LjUxNCwwLDEwLDQuNDg2LDEwLDEwdjEwOC43NWMwLDUuNTIzLDQuNDc4LDEwLDEwLDEwczEwLTQuNDc3LDEwLTEwVjMwYzAtMTYuNTQyLTEzLjQ1OC0zMC0zMC0zMA0KCWgtMzY0Yy0xNi41NDIsMC0zMCwxMy40NTgtMzAsMzB2NDUyYzAsMTYuNTQyLDEzLjQ1OCwzMCwzMCwzMGgzNjRjMTYuNTQyLDAsMzAtMTMuNDU4LDMwLTMwdi03My42NzINCglDNDI0LjAwNyw0MDIuODA1LDQxOS41MjksMzk4LjMyOCw0MTQuMDA3LDM5OC4zMjh6Ii8+DQo8cGF0aCBkPSJNMzA0LjAwNywxNDZjMC01MC43MjktNDEuMjcxLTkyLTkyLTkycy05Miw0MS4yNzEtOTIsOTJjMCwyNi4zMTcsMTEuMTEsNTAuMDg1LDI4Ljg4Miw2Ni44NjkNCgljMC4zMzMsMC4zNTYsMC42ODcsMC42OTMsMS4wNzQsMWMxNi4zNzEsMTQuOTc5LDM4LjE1OCwyNC4xMyw2Mi4wNDMsMjQuMTNzNDUuNjcyLTkuMTUyLDYyLjA0My0yNC4xMw0KCWMwLjM4Ny0wLjMwNywwLjc0MS0wLjY0NSwxLjA3NC0xQzI5Mi44OTcsMTk2LjA4NSwzMDQuMDA3LDE3Mi4zMTcsMzA0LjAwNywxNDZ6IE0yMTIuMDA3LDc0YzM5LjcwMSwwLDcyLDMyLjI5OSw3Miw3Mg0KCWMwLDE1Ljk2Ny01LjIzMSwzMC43My0xNC4wNiw0Mi42ODNjLTcuMzc1LTEwLjkzOC0xNy41OTYtMTkuNDQ1LTI5LjQ2My0yNC42OTdjNC43MS02LjA4Nyw3LjUyMy0xMy43MTIsNy41MjMtMjEuOTg2di02LjUNCgljMC0xOS44NTEtMTYuMTQ5LTM2LTM2LTM2cy0zNiwxNi4xNDktMzYsMzZ2Ni41YzAsOC4yNzQsMi44MTMsMTUuODk5LDcuNTIzLDIxLjk4NmMtMTEuODY3LDUuMjUyLTIyLjA4OCwxMy43NTktMjkuNDYzLDI0LjY5Nw0KCWMtOC44MjktMTEuOTUzLTE0LjA2LTI2LjcxNi0xNC4wNi00Mi42ODNDMTQwLjAwNywxMDYuMjk5LDE3Mi4zMDYsNzQsMjEyLjAwNyw3NHogTTE5Ni4wMDcsMTQydi02LjVjMC04LjgyMiw3LjE3OC0xNiwxNi0xNg0KCXMxNiw3LjE3OCwxNiwxNnY2LjVjMCw4LjgyMi03LjE3OCwxNi0xNiwxNlMxOTYuMDA3LDE1MC44MjIsMTk2LjAwNywxNDJ6IE0xNjguNTE2LDIwMy4zMzINCgljOC43ODktMTUuNTg1LDI1LjE5LTI1LjMzMiw0My40OTEtMjUuMzMyczM0LjcwMiw5Ljc0Nyw0My40OTEsMjUuMzMyQzI0My40MDUsMjEyLjUyOCwyMjguMzM2LDIxOCwyMTIuMDA3LDIxOA0KCVMxODAuNjA4LDIxMi41MjgsMTY4LjUxNiwyMDMuMzMyeiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsNDM4aC01NGMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGg1NGM1LjUyMiwwLDEwLTQuNDc3LDEwLTEwUzI3MS41MjksNDM4LDI2Ni4wMDcsNDM4eiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsMzgyaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwzODIsMjY2LjAwNywzODJ6Ii8+DQo8cGF0aCBkPSJNMjY2LjAwNywzMjZoLTE0MmMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGgxNDJjNS41MjIsMCwxMC00LjQ3NywxMC0xMFMyNzEuNTI5LDMyNiwyNjYuMDA3LDMyNnoiLz4NCjxwYXRoIGQ9Ik04OC4zNjYsMjcyLjkzYy0xLjg1OS0xLjg2LTQuNDM5LTIuOTMtNy4wNzktMi45M2MtMi42MzEsMC01LjIxMSwxLjA3LTcuMDcsMi45M2MtMS44NiwxLjg2LTIuOTMsNC40NC0yLjkzLDcuMDcNCglzMS4wNjksNS4yMSwyLjkzLDcuMDdjMS44NywxLjg2LDQuNDM5LDIuOTMsNy4wNywyLjkzYzIuNjQsMCw1LjIxLTEuMDcsNy4wNzktMi45M2MxLjg2LTEuODYsMi45MzEtNC40NCwyLjkzMS03LjA3DQoJUzkwLjIyNywyNzQuNzksODguMzY2LDI3Mi45M3oiLz4NCjxwYXRoIGQ9Ik04OC4zNjYsMzI4LjkzYy0xLjg2OS0xLjg2LTQuNDM5LTIuOTMtNy4wNzktMi45M2MtMi42MzEsMC01LjIsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3DQoJczEuMDY5LDUuMjEsMi45Myw3LjA3YzEuODcsMS44Niw0LjQzOSwyLjkzLDcuMDcsMi45M2MyLjY0LDAsNS4yMS0xLjA3LDcuMDc5LTIuOTNjMS44Ni0xLjg2LDIuOTMxLTQuNDQsMi45MzEtNy4wNw0KCVM5MC4yMjcsMzMwLjc5LDg4LjM2NiwzMjguOTN6Ii8+DQo8cGF0aCBkPSJNODEuMjg3LDM4MmMtMi42MzEsMC01LjIsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3czEuMDY5LDUuMjEsMi45Myw3LjA3DQoJYzEuODU5LDEuODYsNC40MzksMi45Myw3LjA3LDIuOTNjMi42NCwwLDUuMjItMS4wNyw3LjA3OS0yLjkzYzEuODYtMS44NiwyLjkzMS00LjQ0LDIuOTMxLTcuMDdzLTEuMDctNS4yMS0yLjkzMS03LjA3DQoJQzg2LjQ5NywzODMuMDcsODMuOTI3LDM4Miw4MS4yODcsMzgyeiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsMjcwaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwyNzAsMjY2LjAwNywyNzB6Ii8+DQo8cGF0aCBkPSJNNDkxLjAwMiwxMzAuMzJjLTkuNzE1LTUuNjA5LTIxLjAzMy03LjA5OS0zMS44NzEtNC4xOTZjLTEwLjgzNiwyLjkwNC0xOS44OTQsOS44NTQtMjUuNTAyLDE5LjU2OUwzMDcuNzg3LDM2My42NTYNCgljLTAuNjg5LDEuMTk1LTEuMTI1LDIuNTItMS4yNzgsMy44OTFsLTguODU4LDc5LjM0NGMtMC40NCwzLjk0OCwxLjQ5OCw3Ljc4Myw0LjkzOCw5Ljc3YzEuNTUzLDAuODk2LDMuMjc4LDEuMzQsNC45OTksMS4zNA0KCWMyLjA5MiwwLDQuMTc2LTAuNjU1LDUuOTMxLTEuOTQ4bDY0LjI4NC00Ny4zNDRjMS4xMTEtMC44MTgsMi4wNDEtMS44NTcsMi43My0zLjA1MmwxMjUuODQxLTIxNy45NjMNCglDNTE3Ljk1NCwxNjcuNjM4LDUxMS4wNTgsMTQxLjksNDkxLjAwMiwxMzAuMzJ6IE0zMjQuNjg5LDM4NC45NjJsMjguOTQyLDE2LjcxbC0zMy41NjgsMjQuNzIyTDMyNC42ODksMzg0Ljk2MnogTTM2OC4yMTMsMzg2Ljk5Ng0KCWwtMzguMTA1LTIybDEwMC45ODUtMTc0LjkxbDM4LjEwNSwyMkwzNjguMjEzLDM4Ni45OTZ6IE00ODkuMDU0LDE3Ny42OTNsLTkuODU3LDE3LjA3M2wtMzguMTA1LTIybDkuODU3LTE3LjA3Mw0KCWMyLjkzOC01LjA4OSw3LjY4Mi04LjcyOSwxMy4zNTgtMTAuMjVjNS42NzgtMS41MjIsMTEuNjA2LTAuNzQsMTYuNjk0LDIuMTk4YzUuMDg5LDIuOTM4LDguNzI5LDcuNjgyLDEwLjI1LDEzLjM1OA0KCUM0OTIuNzcyLDE2Ni42NzUsNDkxLjk5MiwxNzIuNjA0LDQ4OS4wNTQsMTc3LjY5M3oiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K'
                  );
                  introImg.setAttribute('style', 'width: 1.5em');
                  introImg.setAttribute(
                    'src',
                    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQzg3MDsiIGQ9Ik00NDMsNTAyLjA2M0gxNDljLTExLjA0NiwwLTIwLTguOTU0LTIwLTIwdi0zNzJjMC0xMS4wNDYsOC45NTQtMjAsMjAtMjBoMjk0DQoJYzExLjA0NiwwLDIwLDguOTU0LDIwLDIwdjM3MkM0NjMsNDkzLjEwOSw0NTQuMDQ2LDUwMi4wNjMsNDQzLDUwMi4wNjN6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZEQUEwOyIgZD0iTTQwMyw0NjIuMDYzSDEwOWMtMTEuMDQ2LDAtMjAtOC45NTQtMjAtMjB2LTM3MmMwLTExLjA0Niw4Ljk1NC0yMCwyMC0yMGgyOTQNCgljMTEuMDQ2LDAsMjAsOC45NTQsMjAsMjB2MzcyQzQyMyw0NTMuMTA5LDQxNC4wNDYsNDYyLjA2Myw0MDMsNDYyLjA2M3oiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzYyLjkzNyw0MjJoLTI5NGMtMTEuMDQ2LDAtMjAtOC45NTQtMjAtMjBWMzBjMC0xMS4wNDYsOC45NTQtMjAsMjAtMjBoMjk0YzExLjA0NiwwLDIwLDguOTU0LDIwLDIwDQoJdjM3MkMzODIuOTM3LDQxMy4wNDYsMzczLjk4Miw0MjIsMzYyLjkzNyw0MjJ6Ii8+DQo8cmVjdCB4PSIxMDQuOTQiIHk9Ijg0IiBzdHlsZT0iZmlsbDojQkFFRTgzOyIgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2Ii8+DQo8cGF0aCBkPSJNMzYyLjkzNyw0MzJoLTI5NGMtMTYuNTQyLDAtMzAtMTMuNDU4LTMwLTMwVjIxNi4zMzNjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMGM1LjUyMiwwLDEwLDQuNDc3LDEwLDEwVjQwMg0KCWMwLDUuNTE0LDQuNDg2LDEwLDEwLDEwaDI5NGM1LjUxNCwwLDEwLTQuNDg2LDEwLTEwVjMwYzAtNS41MTQtNC40ODYtMTAtMTAtMTBoLTI5NGMtNS41MTQsMC0xMCw0LjQ4Ni0xMCwxMHYxMDINCgljMCw1LjUyMy00LjQ3OCwxMC0xMCwxMGMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMFYzMGMwLTE2LjU0MiwxMy40NTgtMzAsMzAtMzBoMjk0YzE2LjU0MiwwLDMwLDEzLjQ1OCwzMCwzMHYzNzINCglDMzkyLjkzNyw0MTguNTQyLDM3OS40NzksNDMyLDM2Mi45MzcsNDMyeiIvPg0KPHBhdGggZD0iTTQ4LjkzNywxODYuNzhjLTIuNjMsMC01LjIxLTEuMDctNy4wNy0yLjkzYy0xLjg2LTEuODctMi45My00LjQ0LTIuOTMtNy4wOGMwLTIuNjIsMS4wNjktNS4yLDIuOTMtNy4wNw0KCWMxLjg2LTEuODYsNC40NC0yLjkyLDcuMDctMi45MmMyLjYzLDAsNS4yMSwxLjA2LDcuMDY5LDIuOTJjMS44NiwxLjg3LDIuOTMxLDQuNDQsMi45MzEsNy4wN2MwLDIuNjQtMS4wNyw1LjIyLTIuOTMxLDcuMDgNCglDNTQuMTQ2LDE4NS43MSw1MS41NjYsMTg2Ljc4LDQ4LjkzNywxODYuNzh6Ii8+DQo8cGF0aCBkPSJNODguOTk2LDQ3Mi4wNmMtMi42MywwLTUuMjEtMS4wNi03LjA2OS0yLjkzYy0xLjg2LTEuODYtMi45MzEtNC40My0yLjkzMS03LjA3YzAtMi42MywxLjA3LTUuMjEsMi45MzEtNy4wNw0KCWMxLjg1OS0xLjg2LDQuNDM5LTIuOTMsNy4wNjktMi45M2MyLjY0MSwwLDUuMjEsMS4wNyw3LjA3LDIuOTNzMi45Myw0LjQ0LDIuOTMsNy4wN2MwLDIuNjQtMS4wNjksNS4yMS0yLjkzLDcuMDcNCglDOTQuMjA2LDQ3MSw5MS42MzcsNDcyLjA2LDg4Ljk5Niw0NzIuMDZ6Ii8+DQo8cGF0aCBkPSJNNDAzLDQ3Mi4wNjNIMTI5Yy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDI3NGM1LjUxNCwwLDEwLTQuNDg2LDEwLTEwdi0zOTJjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMA0KCXMxMCw0LjQ3NywxMCwxMHYzOTJDNDMzLDQ1OC42MDUsNDE5LjU0Miw0NzIuMDYzLDQwMyw0NzIuMDYzeiIvPg0KPHBhdGggZD0iTTQ0My4wNjMsNTEyaC0zMTRjLTUuNTIyLDAtMTAtNC40NzctMTAtMTBzNC40NzgtMTAsMTAtMTBoMzE0YzUuNTE0LDAsMTAtNC40ODYsMTAtMTBWOTBjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMA0KCXMxMCw0LjQ3NywxMCwxMHYzOTJDNDczLjA2Myw0OTguNTQyLDQ1OS42MDUsNTEyLDQ0My4wNjMsNTEyeiIvPg0KPHBhdGggZD0iTTIwMC45MzcsMTkwaC05NmMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMFY4NGMwLTUuNTIzLDQuNDc4LTEwLDEwLTEwaDk2YzUuNTIyLDAsMTAsNC40NzcsMTAsMTB2OTYNCglDMjEwLjkzNywxODUuNTIzLDIwNi40NTksMTkwLDIwMC45MzcsMTkweiBNMTE0LjkzNywxNzBoNzZWOTRoLTc2VjE3MHoiLz4NCjxwYXRoIGQ9Ik0xMjguMDM1LDI4Ni4xMjdMMTI4LjAzNSwyODYuMTI3Yy0yLjY1MiwwLTUuMTk1LTEuMDU0LTcuMDcxLTIuOTI5bC0xOS40MzItMTkuNDMyYy0zLjkwNS0zLjkwNS0zLjkwNS0xMC4yMzcsMC0xNC4xNDINCgljMy45MDgtMy45MDQsMTAuMjM4LTMuOTA1LDE0LjE0MywwbDEyLjM2LDEyLjM2MWwyNi41ODMtMjYuNTgzYzMuOTA3LTMuOTA1LDEwLjIzNy0zLjkwNCwxNC4xNDMsMA0KCWMzLjkwNSwzLjkwNSwzLjkwNSwxMC4yMzcsMCwxNC4xNDJsLTMzLjY1NCwzMy42NTRDMTMzLjIzLDI4NS4wNzMsMTMwLjY4OCwyODYuMTI3LDEyOC4wMzUsMjg2LjEyN3oiLz4NCjxwYXRoIGQ9Ik0zMzIuNjA0LDI2OUgyMTUuOTM3Yy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDExNi42NjdjNS41MjIsMCwxMCw0LjQ3NywxMCwxMA0KCUMzNDIuNjA0LDI2NC41MjMsMzM4LjEyNiwyNjksMzMyLjYwNCwyNjl6Ii8+DQo8cGF0aCBkPSJNMzI2LjkzNyw5NGgtNzBjLTUuNTIyLDAtMTAtNC40NzctMTAtMTBzNC40NzgtMTAsMTAtMTBoNzBjNS41MjIsMCwxMCw0LjQ3NywxMCwxMFMzMzIuNDU5LDk0LDMyNi45MzcsOTR6Ii8+DQo8cGF0aCBkPSJNMzI2LjkzNywxNDJoLTcwYy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDcwYzUuNTIyLDAsMTAsNC40NzcsMTAsMTANCglDMzM2LjkzNywxMzcuNTIzLDMzMi40NTksMTQyLDMyNi45MzcsMTQyeiIvPg0KPHBhdGggZD0iTTMyNi45MzcsMTkwaC03MGMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3OC0xMCwxMC0xMGg3MGM1LjUyMiwwLDEwLDQuNDc3LDEwLDEwUzMzMi40NTksMTkwLDMyNi45MzcsMTkweiIvPg0KPHBhdGggZD0iTTEyOC4wMzUsMzYyLjQ5NEwxMjguMDM1LDM2Mi40OTRjLTIuNjUyLDAtNS4xOTUtMS4wNTQtNy4wNzEtMi45MjlsLTE5LjQzMi0xOS40MzJjLTMuOTA1LTMuOTA1LTMuOTA1LTEwLjIzNywwLTE0LjE0Mg0KCWMzLjkwOC0zLjkwNCwxMC4yMzgtMy45MDUsMTQuMTQzLDBsMTIuMzYsMTIuMzYxbDI2LjU4My0yNi41ODNjMy45MDctMy45MDUsMTAuMjM3LTMuOTA0LDE0LjE0MywwDQoJYzMuOTA1LDMuOTA1LDMuOTA1LDEwLjIzNywwLDE0LjE0MmwtMzMuNjU0LDMzLjY1NEMxMzMuMjMsMzYxLjQ0LDEzMC42ODgsMzYyLjQ5NCwxMjguMDM1LDM2Mi40OTR6Ii8+DQo8cGF0aCBkPSJNMzMyLjYwNCwzNDVIMjE1LjkzN2MtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3OC0xMCwxMC0xMGgxMTYuNjY3YzUuNTIyLDAsMTAsNC40NzcsMTAsMTBTMzM4LjEyNiwzNDUsMzMyLjYwNCwzNDV6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=='
                  );
                  apId.setAttribute('style', 'display:none;');
                  listNum.setAttribute('style', 'display:none;');

                  nameTh.textContent = applys[j].user_name;
                  areaTh.textContent = applys[j].ap_area;
                  taskTh.textContent = applys[j].ap_task;
                  apId.textContent = applys[j].ap_id;
                  listNum.textContent = dNum;

                  myTr.appendChild(nameTh);
                  myTr.appendChild(cvTh);
                  myTr.appendChild(introTh);
                  myTr.appendChild(areaTh);
                  myTr.appendChild(taskTh);
                  myTr.appendChild(apId);
                  myTr.appendChild(listNum);
                  cvTh.appendChild(cvLink);
                  cvLink.appendChild(cvImg);
                  introTh.appendChild(introLink);
                  introLink.appendChild(introImg);
                }
              }
            });
          }
        }

        function applyFail(jsonObj) {
          let applys = jsonObj['dtoList'];
          let userId;
          let introNum;
          for (let j = 0; j < applys.length; j++) {
            let myTr = document.createElement('tr');
            listRejectedCandidates.appendChild(myTr);

            let nameTh = document.createElement('td');
            let cvTh = document.createElement('td');
            let introTh = document.createElement('td');
            let areaTh = document.createElement('td');
            let taskTh = document.createElement('td');
            let cvLink = document.createElement('a');
            let introLink = document.createElement('a');
            let cvImg = document.createElement('img');
            let introImg = document.createElement('img');
            let apId = document.createElement('td');
            let listNum = document.createElement('td');
            userId = applys[j].user_id;
            introNum = applys[j].intro_num;
            listNum.setAttribute('class', 'listNum');
            cvLink.setAttribute('href', '/application/etp/cv/read?id=' + userId);
            cvLink.setAttribute('target', '_black');
            introLink.setAttribute('href', '/application/etp/introduce/read?num=' + introNum);
            introLink.setAttribute('target', '_black');
            cvImg.setAttribute('style', 'width: 1.5em');
            cvImg.setAttribute(
              'src',
              'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zOTQuMDA3LDUwMmgtMzY0Yy0xMS4wNDYsMC0yMC04Ljk1NC0yMC0yMFYzMGMwLTExLjA0Niw4Ljk1NC0yMCwyMC0yMGgzNjRjMTEuMDQ2LDAsMjAsOC45NTQsMjAsMjANCgl2NDUyQzQxNC4wMDcsNDkzLjA0Niw0MDUuMDUzLDUwMiwzOTQuMDA3LDUwMnoiLz4NCjxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZFNjY2MzsiIGN4PSIyMTIuMDEiIGN5PSIxNDYiIHI9IjgyIi8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZDREFDOyIgZD0iTTIzOC4wMDcsMTM1LjV2Ni41YzAsMTQuMzU5LTExLjY0MSwyNi0yNiwyNmwwLDBsMCwwYy0xNC4zNTksMC0yNi0xMS42NDEtMjYtMjZ2LTYuNQ0KCWMwLTE0LjM1OSwxMS42NDEtMjYsMjYtMjZsMCwwQzIyNi4zNjYsMTA5LjUsMjM4LjAwNywxMjEuMTQxLDIzOC4wMDcsMTM1LjV6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojQTVEREZGOyIgZD0iTTIxMi4wMDcsMTY4TDIxMi4wMDcsMTY4Yy0yNS4zOCwwLTQ3LjA2NCwxNS43NjctNTUuODMyLDM4LjAzMw0KCUMxNzAuODE1LDIxOS42NTUsMTkwLjQzMiwyMjgsMjEyLjAwNywyMjhzNDEuMTkyLTguMzQ1LDU1LjgzMi0yMS45NjdDMjU5LjA3MSwxODMuNzY3LDIzNy4zODcsMTY4LDIxMi4wMDcsMTY4eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQkM1MzsiIGQ9Ik00MzYuNTc0LDE2MC41OWw1LjcxNC05Ljg5N2M4LjgzNy0xNS4zMDUsMjguNDA3LTIwLjU0OSw0My43MTMtMTEuNzEzbDAsMA0KCWMxNS4zMDUsOC44MzcsMjAuNTQ5LDI4LjQwNywxMS43MTMsNDMuNzEzTDM3MS44NzMsNDAwLjY1NmwtNTUuNDI2LTMybDU0LjI4Mi05NC4wMkw0MzYuNTc0LDE2MC41OXoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRTY2NjM7IiBkPSJNNDg2LjAwMiwxMzguOThMNDg2LjAwMiwxMzguOThjLTE1LjMwNS04LjgzNy0zNC44NzYtMy41OTMtNDMuNzEzLDExLjcxM2wtMTQuODU3LDI1LjczM2w1NS40MjYsMzINCglsMTQuODU3LTI1LjczM0M1MDYuNTUxLDE2Ny4zODgsNTAxLjMwNywxNDcuODE3LDQ4Ni4wMDIsMTM4Ljk4eiIvPg0KPHBvbHlnb24gc3R5bGU9ImZpbGw6IzlBRDhGRjsiIHBvaW50cz0iMzcxLjg3Myw0MDAuNjU2IDMwNy41ODksNDQ4IDMxNi40NDcsMzY4LjY1NiAiLz4NCjxwYXRoIGQ9Ik00MTQuMDA3LDM5OC4zMjhjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBWNDgyYzAsNS41MTQtNC40ODYsMTAtMTAsMTBoLTM2NGMtNS41MTQsMC0xMC00LjQ4Ni0xMC0xMFYzMA0KCWMwLTUuNTE0LDQuNDg2LTEwLDEwLTEwaDM2NGM1LjUxNCwwLDEwLDQuNDg2LDEwLDEwdjEwOC43NWMwLDUuNTIzLDQuNDc4LDEwLDEwLDEwczEwLTQuNDc3LDEwLTEwVjMwYzAtMTYuNTQyLTEzLjQ1OC0zMC0zMC0zMA0KCWgtMzY0Yy0xNi41NDIsMC0zMCwxMy40NTgtMzAsMzB2NDUyYzAsMTYuNTQyLDEzLjQ1OCwzMCwzMCwzMGgzNjRjMTYuNTQyLDAsMzAtMTMuNDU4LDMwLTMwdi03My42NzINCglDNDI0LjAwNyw0MDIuODA1LDQxOS41MjksMzk4LjMyOCw0MTQuMDA3LDM5OC4zMjh6Ii8+DQo8cGF0aCBkPSJNMzA0LjAwNywxNDZjMC01MC43MjktNDEuMjcxLTkyLTkyLTkycy05Miw0MS4yNzEtOTIsOTJjMCwyNi4zMTcsMTEuMTEsNTAuMDg1LDI4Ljg4Miw2Ni44NjkNCgljMC4zMzMsMC4zNTYsMC42ODcsMC42OTMsMS4wNzQsMWMxNi4zNzEsMTQuOTc5LDM4LjE1OCwyNC4xMyw2Mi4wNDMsMjQuMTNzNDUuNjcyLTkuMTUyLDYyLjA0My0yNC4xMw0KCWMwLjM4Ny0wLjMwNywwLjc0MS0wLjY0NSwxLjA3NC0xQzI5Mi44OTcsMTk2LjA4NSwzMDQuMDA3LDE3Mi4zMTcsMzA0LjAwNywxNDZ6IE0yMTIuMDA3LDc0YzM5LjcwMSwwLDcyLDMyLjI5OSw3Miw3Mg0KCWMwLDE1Ljk2Ny01LjIzMSwzMC43My0xNC4wNiw0Mi42ODNjLTcuMzc1LTEwLjkzOC0xNy41OTYtMTkuNDQ1LTI5LjQ2My0yNC42OTdjNC43MS02LjA4Nyw3LjUyMy0xMy43MTIsNy41MjMtMjEuOTg2di02LjUNCgljMC0xOS44NTEtMTYuMTQ5LTM2LTM2LTM2cy0zNiwxNi4xNDktMzYsMzZ2Ni41YzAsOC4yNzQsMi44MTMsMTUuODk5LDcuNTIzLDIxLjk4NmMtMTEuODY3LDUuMjUyLTIyLjA4OCwxMy43NTktMjkuNDYzLDI0LjY5Nw0KCWMtOC44MjktMTEuOTUzLTE0LjA2LTI2LjcxNi0xNC4wNi00Mi42ODNDMTQwLjAwNywxMDYuMjk5LDE3Mi4zMDYsNzQsMjEyLjAwNyw3NHogTTE5Ni4wMDcsMTQydi02LjVjMC04LjgyMiw3LjE3OC0xNiwxNi0xNg0KCXMxNiw3LjE3OCwxNiwxNnY2LjVjMCw4LjgyMi03LjE3OCwxNi0xNiwxNlMxOTYuMDA3LDE1MC44MjIsMTk2LjAwNywxNDJ6IE0xNjguNTE2LDIwMy4zMzINCgljOC43ODktMTUuNTg1LDI1LjE5LTI1LjMzMiw0My40OTEtMjUuMzMyczM0LjcwMiw5Ljc0Nyw0My40OTEsMjUuMzMyQzI0My40MDUsMjEyLjUyOCwyMjguMzM2LDIxOCwyMTIuMDA3LDIxOA0KCVMxODAuNjA4LDIxMi41MjgsMTY4LjUxNiwyMDMuMzMyeiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsNDM4aC01NGMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGg1NGM1LjUyMiwwLDEwLTQuNDc3LDEwLTEwUzI3MS41MjksNDM4LDI2Ni4wMDcsNDM4eiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsMzgyaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwzODIsMjY2LjAwNywzODJ6Ii8+DQo8cGF0aCBkPSJNMjY2LjAwNywzMjZoLTE0MmMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGgxNDJjNS41MjIsMCwxMC00LjQ3NywxMC0xMFMyNzEuNTI5LDMyNiwyNjYuMDA3LDMyNnoiLz4NCjxwYXRoIGQ9Ik04OC4zNjYsMjcyLjkzYy0xLjg1OS0xLjg2LTQuNDM5LTIuOTMtNy4wNzktMi45M2MtMi42MzEsMC01LjIxMSwxLjA3LTcuMDcsMi45M2MtMS44NiwxLjg2LTIuOTMsNC40NC0yLjkzLDcuMDcNCglzMS4wNjksNS4yMSwyLjkzLDcuMDdjMS44NywxLjg2LDQuNDM5LDIuOTMsNy4wNywyLjkzYzIuNjQsMCw1LjIxLTEuMDcsNy4wNzktMi45M2MxLjg2LTEuODYsMi45MzEtNC40NCwyLjkzMS03LjA3DQoJUzkwLjIyNywyNzQuNzksODguMzY2LDI3Mi45M3oiLz4NCjxwYXRoIGQ9Ik04OC4zNjYsMzI4LjkzYy0xLjg2OS0xLjg2LTQuNDM5LTIuOTMtNy4wNzktMi45M2MtMi42MzEsMC01LjIsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3DQoJczEuMDY5LDUuMjEsMi45Myw3LjA3YzEuODcsMS44Niw0LjQzOSwyLjkzLDcuMDcsMi45M2MyLjY0LDAsNS4yMS0xLjA3LDcuMDc5LTIuOTNjMS44Ni0xLjg2LDIuOTMxLTQuNDQsMi45MzEtNy4wNw0KCVM5MC4yMjcsMzMwLjc5LDg4LjM2NiwzMjguOTN6Ii8+DQo8cGF0aCBkPSJNODEuMjg3LDM4MmMtMi42MzEsMC01LjIsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3czEuMDY5LDUuMjEsMi45Myw3LjA3DQoJYzEuODU5LDEuODYsNC40MzksMi45Myw3LjA3LDIuOTNjMi42NCwwLDUuMjItMS4wNyw3LjA3OS0yLjkzYzEuODYtMS44NiwyLjkzMS00LjQ0LDIuOTMxLTcuMDdzLTEuMDctNS4yMS0yLjkzMS03LjA3DQoJQzg2LjQ5NywzODMuMDcsODMuOTI3LDM4Miw4MS4yODcsMzgyeiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsMjcwaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwyNzAsMjY2LjAwNywyNzB6Ii8+DQo8cGF0aCBkPSJNNDkxLjAwMiwxMzAuMzJjLTkuNzE1LTUuNjA5LTIxLjAzMy03LjA5OS0zMS44NzEtNC4xOTZjLTEwLjgzNiwyLjkwNC0xOS44OTQsOS44NTQtMjUuNTAyLDE5LjU2OUwzMDcuNzg3LDM2My42NTYNCgljLTAuNjg5LDEuMTk1LTEuMTI1LDIuNTItMS4yNzgsMy44OTFsLTguODU4LDc5LjM0NGMtMC40NCwzLjk0OCwxLjQ5OCw3Ljc4Myw0LjkzOCw5Ljc3YzEuNTUzLDAuODk2LDMuMjc4LDEuMzQsNC45OTksMS4zNA0KCWMyLjA5MiwwLDQuMTc2LTAuNjU1LDUuOTMxLTEuOTQ4bDY0LjI4NC00Ny4zNDRjMS4xMTEtMC44MTgsMi4wNDEtMS44NTcsMi43My0zLjA1MmwxMjUuODQxLTIxNy45NjMNCglDNTE3Ljk1NCwxNjcuNjM4LDUxMS4wNTgsMTQxLjksNDkxLjAwMiwxMzAuMzJ6IE0zMjQuNjg5LDM4NC45NjJsMjguOTQyLDE2LjcxbC0zMy41NjgsMjQuNzIyTDMyNC42ODksMzg0Ljk2MnogTTM2OC4yMTMsMzg2Ljk5Ng0KCWwtMzguMTA1LTIybDEwMC45ODUtMTc0LjkxbDM4LjEwNSwyMkwzNjguMjEzLDM4Ni45OTZ6IE00ODkuMDU0LDE3Ny42OTNsLTkuODU3LDE3LjA3M2wtMzguMTA1LTIybDkuODU3LTE3LjA3Mw0KCWMyLjkzOC01LjA4OSw3LjY4Mi04LjcyOSwxMy4zNTgtMTAuMjVjNS42NzgtMS41MjIsMTEuNjA2LTAuNzQsMTYuNjk0LDIuMTk4YzUuMDg5LDIuOTM4LDguNzI5LDcuNjgyLDEwLjI1LDEzLjM1OA0KCUM0OTIuNzcyLDE2Ni42NzUsNDkxLjk5MiwxNzIuNjA0LDQ4OS4wNTQsMTc3LjY5M3oiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K'
            );
            introImg.setAttribute('style', 'width: 1.5em');
            introImg.setAttribute(
              'src',
              'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQzg3MDsiIGQ9Ik00NDMsNTAyLjA2M0gxNDljLTExLjA0NiwwLTIwLTguOTU0LTIwLTIwdi0zNzJjMC0xMS4wNDYsOC45NTQtMjAsMjAtMjBoMjk0DQoJYzExLjA0NiwwLDIwLDguOTU0LDIwLDIwdjM3MkM0NjMsNDkzLjEwOSw0NTQuMDQ2LDUwMi4wNjMsNDQzLDUwMi4wNjN6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZEQUEwOyIgZD0iTTQwMyw0NjIuMDYzSDEwOWMtMTEuMDQ2LDAtMjAtOC45NTQtMjAtMjB2LTM3MmMwLTExLjA0Niw4Ljk1NC0yMCwyMC0yMGgyOTQNCgljMTEuMDQ2LDAsMjAsOC45NTQsMjAsMjB2MzcyQzQyMyw0NTMuMTA5LDQxNC4wNDYsNDYyLjA2Myw0MDMsNDYyLjA2M3oiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzYyLjkzNyw0MjJoLTI5NGMtMTEuMDQ2LDAtMjAtOC45NTQtMjAtMjBWMzBjMC0xMS4wNDYsOC45NTQtMjAsMjAtMjBoMjk0YzExLjA0NiwwLDIwLDguOTU0LDIwLDIwDQoJdjM3MkMzODIuOTM3LDQxMy4wNDYsMzczLjk4Miw0MjIsMzYyLjkzNyw0MjJ6Ii8+DQo8cmVjdCB4PSIxMDQuOTQiIHk9Ijg0IiBzdHlsZT0iZmlsbDojQkFFRTgzOyIgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2Ii8+DQo8cGF0aCBkPSJNMzYyLjkzNyw0MzJoLTI5NGMtMTYuNTQyLDAtMzAtMTMuNDU4LTMwLTMwVjIxNi4zMzNjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMGM1LjUyMiwwLDEwLDQuNDc3LDEwLDEwVjQwMg0KCWMwLDUuNTE0LDQuNDg2LDEwLDEwLDEwaDI5NGM1LjUxNCwwLDEwLTQuNDg2LDEwLTEwVjMwYzAtNS41MTQtNC40ODYtMTAtMTAtMTBoLTI5NGMtNS41MTQsMC0xMCw0LjQ4Ni0xMCwxMHYxMDINCgljMCw1LjUyMy00LjQ3OCwxMC0xMCwxMGMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMFYzMGMwLTE2LjU0MiwxMy40NTgtMzAsMzAtMzBoMjk0YzE2LjU0MiwwLDMwLDEzLjQ1OCwzMCwzMHYzNzINCglDMzkyLjkzNyw0MTguNTQyLDM3OS40NzksNDMyLDM2Mi45MzcsNDMyeiIvPg0KPHBhdGggZD0iTTQ4LjkzNywxODYuNzhjLTIuNjMsMC01LjIxLTEuMDctNy4wNy0yLjkzYy0xLjg2LTEuODctMi45My00LjQ0LTIuOTMtNy4wOGMwLTIuNjIsMS4wNjktNS4yLDIuOTMtNy4wNw0KCWMxLjg2LTEuODYsNC40NC0yLjkyLDcuMDctMi45MmMyLjYzLDAsNS4yMSwxLjA2LDcuMDY5LDIuOTJjMS44NiwxLjg3LDIuOTMxLDQuNDQsMi45MzEsNy4wN2MwLDIuNjQtMS4wNyw1LjIyLTIuOTMxLDcuMDgNCglDNTQuMTQ2LDE4NS43MSw1MS41NjYsMTg2Ljc4LDQ4LjkzNywxODYuNzh6Ii8+DQo8cGF0aCBkPSJNODguOTk2LDQ3Mi4wNmMtMi42MywwLTUuMjEtMS4wNi03LjA2OS0yLjkzYy0xLjg2LTEuODYtMi45MzEtNC40My0yLjkzMS03LjA3YzAtMi42MywxLjA3LTUuMjEsMi45MzEtNy4wNw0KCWMxLjg1OS0xLjg2LDQuNDM5LTIuOTMsNy4wNjktMi45M2MyLjY0MSwwLDUuMjEsMS4wNyw3LjA3LDIuOTNzMi45Myw0LjQ0LDIuOTMsNy4wN2MwLDIuNjQtMS4wNjksNS4yMS0yLjkzLDcuMDcNCglDOTQuMjA2LDQ3MSw5MS42MzcsNDcyLjA2LDg4Ljk5Niw0NzIuMDZ6Ii8+DQo8cGF0aCBkPSJNNDAzLDQ3Mi4wNjNIMTI5Yy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDI3NGM1LjUxNCwwLDEwLTQuNDg2LDEwLTEwdi0zOTJjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMA0KCXMxMCw0LjQ3NywxMCwxMHYzOTJDNDMzLDQ1OC42MDUsNDE5LjU0Miw0NzIuMDYzLDQwMyw0NzIuMDYzeiIvPg0KPHBhdGggZD0iTTQ0My4wNjMsNTEyaC0zMTRjLTUuNTIyLDAtMTAtNC40NzctMTAtMTBzNC40NzgtMTAsMTAtMTBoMzE0YzUuNTE0LDAsMTAtNC40ODYsMTAtMTBWOTBjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMA0KCXMxMCw0LjQ3NywxMCwxMHYzOTJDNDczLjA2Myw0OTguNTQyLDQ1OS42MDUsNTEyLDQ0My4wNjMsNTEyeiIvPg0KPHBhdGggZD0iTTIwMC45MzcsMTkwaC05NmMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMFY4NGMwLTUuNTIzLDQuNDc4LTEwLDEwLTEwaDk2YzUuNTIyLDAsMTAsNC40NzcsMTAsMTB2OTYNCglDMjEwLjkzNywxODUuNTIzLDIwNi40NTksMTkwLDIwMC45MzcsMTkweiBNMTE0LjkzNywxNzBoNzZWOTRoLTc2VjE3MHoiLz4NCjxwYXRoIGQ9Ik0xMjguMDM1LDI4Ni4xMjdMMTI4LjAzNSwyODYuMTI3Yy0yLjY1MiwwLTUuMTk1LTEuMDU0LTcuMDcxLTIuOTI5bC0xOS40MzItMTkuNDMyYy0zLjkwNS0zLjkwNS0zLjkwNS0xMC4yMzcsMC0xNC4xNDINCgljMy45MDgtMy45MDQsMTAuMjM4LTMuOTA1LDE0LjE0MywwbDEyLjM2LDEyLjM2MWwyNi41ODMtMjYuNTgzYzMuOTA3LTMuOTA1LDEwLjIzNy0zLjkwNCwxNC4xNDMsMA0KCWMzLjkwNSwzLjkwNSwzLjkwNSwxMC4yMzcsMCwxNC4xNDJsLTMzLjY1NCwzMy42NTRDMTMzLjIzLDI4NS4wNzMsMTMwLjY4OCwyODYuMTI3LDEyOC4wMzUsMjg2LjEyN3oiLz4NCjxwYXRoIGQ9Ik0zMzIuNjA0LDI2OUgyMTUuOTM3Yy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDExNi42NjdjNS41MjIsMCwxMCw0LjQ3NywxMCwxMA0KCUMzNDIuNjA0LDI2NC41MjMsMzM4LjEyNiwyNjksMzMyLjYwNCwyNjl6Ii8+DQo8cGF0aCBkPSJNMzI2LjkzNyw5NGgtNzBjLTUuNTIyLDAtMTAtNC40NzctMTAtMTBzNC40NzgtMTAsMTAtMTBoNzBjNS41MjIsMCwxMCw0LjQ3NywxMCwxMFMzMzIuNDU5LDk0LDMyNi45MzcsOTR6Ii8+DQo8cGF0aCBkPSJNMzI2LjkzNywxNDJoLTcwYy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDcwYzUuNTIyLDAsMTAsNC40NzcsMTAsMTANCglDMzM2LjkzNywxMzcuNTIzLDMzMi40NTksMTQyLDMyNi45MzcsMTQyeiIvPg0KPHBhdGggZD0iTTMyNi45MzcsMTkwaC03MGMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3OC0xMCwxMC0xMGg3MGM1LjUyMiwwLDEwLDQuNDc3LDEwLDEwUzMzMi40NTksMTkwLDMyNi45MzcsMTkweiIvPg0KPHBhdGggZD0iTTEyOC4wMzUsMzYyLjQ5NEwxMjguMDM1LDM2Mi40OTRjLTIuNjUyLDAtNS4xOTUtMS4wNTQtNy4wNzEtMi45MjlsLTE5LjQzMi0xOS40MzJjLTMuOTA1LTMuOTA1LTMuOTA1LTEwLjIzNywwLTE0LjE0Mg0KCWMzLjkwOC0zLjkwNCwxMC4yMzgtMy45MDUsMTQuMTQzLDBsMTIuMzYsMTIuMzYxbDI2LjU4My0yNi41ODNjMy45MDctMy45MDUsMTAuMjM3LTMuOTA0LDE0LjE0MywwDQoJYzMuOTA1LDMuOTA1LDMuOTA1LDEwLjIzNywwLDE0LjE0MmwtMzMuNjU0LDMzLjY1NEMxMzMuMjMsMzYxLjQ0LDEzMC42ODgsMzYyLjQ5NCwxMjguMDM1LDM2Mi40OTR6Ii8+DQo8cGF0aCBkPSJNMzMyLjYwNCwzNDVIMjE1LjkzN2MtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3OC0xMCwxMC0xMGgxMTYuNjY3YzUuNTIyLDAsMTAsNC40NzcsMTAsMTBTMzM4LjEyNiwzNDUsMzMyLjYwNCwzNDV6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=='
            );
            apId.setAttribute('style', 'display:none;');
            listNum.setAttribute('style', 'display:none;');

            nameTh.textContent = applys[j].user_name;
            areaTh.textContent = applys[j].ap_area;
            taskTh.textContent = applys[j].ap_task;
            apId.textContent = applys[j].ap_id;
            listNum.textContent = dNum;

            myTr.appendChild(nameTh);
            myTr.appendChild(cvTh);
            myTr.appendChild(introTh);
            myTr.appendChild(areaTh);
            myTr.appendChild(taskTh);
            myTr.appendChild(apId);
            myTr.appendChild(listNum);
            cvTh.appendChild(cvLink);
            cvLink.appendChild(cvImg);
            introTh.appendChild(introLink);
            introLink.appendChild(introImg);
          }
          //페이지네이션
          let totalPage = jsonObj['totalPage'];
          let pageNumbers = document.querySelector('#failPageNumbers');
          let pageNumber;
          for (let p = 0; p < totalPage; p++) {
            let page = document.createElement('a');
            page.setAttribute('class', 'Failpage-link');
            page.textContent = p + 1;

            pageNumbers.appendChild(page);

            pageNumber = document.querySelectorAll('.Failpage-link');

            pageNumber[p].addEventListener('click', () => {
              $('#listRejectedCandidates').empty();
              $('.Failpage-link').removeClass('active');

              pageNumber[p].classList.add('active');

              requestFailURL = `/application/etp/employ/list/${dNum}?page=${p + 1}&pass=불합격`;

              let requestFail = new XMLHttpRequest();
              requestFail.open('GET', requestPassURL);

              requestFail.responseType = 'json';
              requestFail.send();

              requestFail.onload = function () {
                let jsonObj = requestFail.response;
                applyFail2(jsonObj);
              };

              function applyFail2(jsonObj) {
                let applys = jsonObj['dtoList'];
                let userId;
                let introNum;
                for (let j = 0; j < applys.length; j++) {
                  let myTr = document.createElement('tr');
                  listRejectedCandidates.appendChild(myTr);

                  let nameTh = document.createElement('td');
                  let cvTh = document.createElement('td');
                  let introTh = document.createElement('td');
                  let areaTh = document.createElement('td');
                  let taskTh = document.createElement('td');
                  let cvLink = document.createElement('a');
                  let introLink = document.createElement('a');
                  let cvImg = document.createElement('img');
                  let introImg = document.createElement('img');
                  let apId = document.createElement('td');
                  let listNum = document.createElement('td');
                  userId = applys[j].user_id;
                  introNum = applys[j].intro_num;
                  listNum.setAttribute('class', 'listNum');
                  cvLink.setAttribute('href', '/application/etp/cv/read?id=' + userId);
                  cvLink.setAttribute('target', '_black');
                  introLink.setAttribute('href', '/application/etp/introduce/read?num=' + introNum);
                  introLink.setAttribute('target', '_black');
                  cvImg.setAttribute('style', 'width: 1.5em');
                  cvImg.setAttribute(
                    'src',
                    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zOTQuMDA3LDUwMmgtMzY0Yy0xMS4wNDYsMC0yMC04Ljk1NC0yMC0yMFYzMGMwLTExLjA0Niw4Ljk1NC0yMCwyMC0yMGgzNjRjMTEuMDQ2LDAsMjAsOC45NTQsMjAsMjANCgl2NDUyQzQxNC4wMDcsNDkzLjA0Niw0MDUuMDUzLDUwMiwzOTQuMDA3LDUwMnoiLz4NCjxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZFNjY2MzsiIGN4PSIyMTIuMDEiIGN5PSIxNDYiIHI9IjgyIi8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZDREFDOyIgZD0iTTIzOC4wMDcsMTM1LjV2Ni41YzAsMTQuMzU5LTExLjY0MSwyNi0yNiwyNmwwLDBsMCwwYy0xNC4zNTksMC0yNi0xMS42NDEtMjYtMjZ2LTYuNQ0KCWMwLTE0LjM1OSwxMS42NDEtMjYsMjYtMjZsMCwwQzIyNi4zNjYsMTA5LjUsMjM4LjAwNywxMjEuMTQxLDIzOC4wMDcsMTM1LjV6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojQTVEREZGOyIgZD0iTTIxMi4wMDcsMTY4TDIxMi4wMDcsMTY4Yy0yNS4zOCwwLTQ3LjA2NCwxNS43NjctNTUuODMyLDM4LjAzMw0KCUMxNzAuODE1LDIxOS42NTUsMTkwLjQzMiwyMjgsMjEyLjAwNywyMjhzNDEuMTkyLTguMzQ1LDU1LjgzMi0yMS45NjdDMjU5LjA3MSwxODMuNzY3LDIzNy4zODcsMTY4LDIxMi4wMDcsMTY4eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQkM1MzsiIGQ9Ik00MzYuNTc0LDE2MC41OWw1LjcxNC05Ljg5N2M4LjgzNy0xNS4zMDUsMjguNDA3LTIwLjU0OSw0My43MTMtMTEuNzEzbDAsMA0KCWMxNS4zMDUsOC44MzcsMjAuNTQ5LDI4LjQwNywxMS43MTMsNDMuNzEzTDM3MS44NzMsNDAwLjY1NmwtNTUuNDI2LTMybDU0LjI4Mi05NC4wMkw0MzYuNTc0LDE2MC41OXoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRTY2NjM7IiBkPSJNNDg2LjAwMiwxMzguOThMNDg2LjAwMiwxMzguOThjLTE1LjMwNS04LjgzNy0zNC44NzYtMy41OTMtNDMuNzEzLDExLjcxM2wtMTQuODU3LDI1LjczM2w1NS40MjYsMzINCglsMTQuODU3LTI1LjczM0M1MDYuNTUxLDE2Ny4zODgsNTAxLjMwNywxNDcuODE3LDQ4Ni4wMDIsMTM4Ljk4eiIvPg0KPHBvbHlnb24gc3R5bGU9ImZpbGw6IzlBRDhGRjsiIHBvaW50cz0iMzcxLjg3Myw0MDAuNjU2IDMwNy41ODksNDQ4IDMxNi40NDcsMzY4LjY1NiAiLz4NCjxwYXRoIGQ9Ik00MTQuMDA3LDM5OC4zMjhjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBWNDgyYzAsNS41MTQtNC40ODYsMTAtMTAsMTBoLTM2NGMtNS41MTQsMC0xMC00LjQ4Ni0xMC0xMFYzMA0KCWMwLTUuNTE0LDQuNDg2LTEwLDEwLTEwaDM2NGM1LjUxNCwwLDEwLDQuNDg2LDEwLDEwdjEwOC43NWMwLDUuNTIzLDQuNDc4LDEwLDEwLDEwczEwLTQuNDc3LDEwLTEwVjMwYzAtMTYuNTQyLTEzLjQ1OC0zMC0zMC0zMA0KCWgtMzY0Yy0xNi41NDIsMC0zMCwxMy40NTgtMzAsMzB2NDUyYzAsMTYuNTQyLDEzLjQ1OCwzMCwzMCwzMGgzNjRjMTYuNTQyLDAsMzAtMTMuNDU4LDMwLTMwdi03My42NzINCglDNDI0LjAwNyw0MDIuODA1LDQxOS41MjksMzk4LjMyOCw0MTQuMDA3LDM5OC4zMjh6Ii8+DQo8cGF0aCBkPSJNMzA0LjAwNywxNDZjMC01MC43MjktNDEuMjcxLTkyLTkyLTkycy05Miw0MS4yNzEtOTIsOTJjMCwyNi4zMTcsMTEuMTEsNTAuMDg1LDI4Ljg4Miw2Ni44NjkNCgljMC4zMzMsMC4zNTYsMC42ODcsMC42OTMsMS4wNzQsMWMxNi4zNzEsMTQuOTc5LDM4LjE1OCwyNC4xMyw2Mi4wNDMsMjQuMTNzNDUuNjcyLTkuMTUyLDYyLjA0My0yNC4xMw0KCWMwLjM4Ny0wLjMwNywwLjc0MS0wLjY0NSwxLjA3NC0xQzI5Mi44OTcsMTk2LjA4NSwzMDQuMDA3LDE3Mi4zMTcsMzA0LjAwNywxNDZ6IE0yMTIuMDA3LDc0YzM5LjcwMSwwLDcyLDMyLjI5OSw3Miw3Mg0KCWMwLDE1Ljk2Ny01LjIzMSwzMC43My0xNC4wNiw0Mi42ODNjLTcuMzc1LTEwLjkzOC0xNy41OTYtMTkuNDQ1LTI5LjQ2My0yNC42OTdjNC43MS02LjA4Nyw3LjUyMy0xMy43MTIsNy41MjMtMjEuOTg2di02LjUNCgljMC0xOS44NTEtMTYuMTQ5LTM2LTM2LTM2cy0zNiwxNi4xNDktMzYsMzZ2Ni41YzAsOC4yNzQsMi44MTMsMTUuODk5LDcuNTIzLDIxLjk4NmMtMTEuODY3LDUuMjUyLTIyLjA4OCwxMy43NTktMjkuNDYzLDI0LjY5Nw0KCWMtOC44MjktMTEuOTUzLTE0LjA2LTI2LjcxNi0xNC4wNi00Mi42ODNDMTQwLjAwNywxMDYuMjk5LDE3Mi4zMDYsNzQsMjEyLjAwNyw3NHogTTE5Ni4wMDcsMTQydi02LjVjMC04LjgyMiw3LjE3OC0xNiwxNi0xNg0KCXMxNiw3LjE3OCwxNiwxNnY2LjVjMCw4LjgyMi03LjE3OCwxNi0xNiwxNlMxOTYuMDA3LDE1MC44MjIsMTk2LjAwNywxNDJ6IE0xNjguNTE2LDIwMy4zMzINCgljOC43ODktMTUuNTg1LDI1LjE5LTI1LjMzMiw0My40OTEtMjUuMzMyczM0LjcwMiw5Ljc0Nyw0My40OTEsMjUuMzMyQzI0My40MDUsMjEyLjUyOCwyMjguMzM2LDIxOCwyMTIuMDA3LDIxOA0KCVMxODAuNjA4LDIxMi41MjgsMTY4LjUxNiwyMDMuMzMyeiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsNDM4aC01NGMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGg1NGM1LjUyMiwwLDEwLTQuNDc3LDEwLTEwUzI3MS41MjksNDM4LDI2Ni4wMDcsNDM4eiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsMzgyaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwzODIsMjY2LjAwNywzODJ6Ii8+DQo8cGF0aCBkPSJNMjY2LjAwNywzMjZoLTE0MmMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGgxNDJjNS41MjIsMCwxMC00LjQ3NywxMC0xMFMyNzEuNTI5LDMyNiwyNjYuMDA3LDMyNnoiLz4NCjxwYXRoIGQ9Ik04OC4zNjYsMjcyLjkzYy0xLjg1OS0xLjg2LTQuNDM5LTIuOTMtNy4wNzktMi45M2MtMi42MzEsMC01LjIxMSwxLjA3LTcuMDcsMi45M2MtMS44NiwxLjg2LTIuOTMsNC40NC0yLjkzLDcuMDcNCglzMS4wNjksNS4yMSwyLjkzLDcuMDdjMS44NywxLjg2LDQuNDM5LDIuOTMsNy4wNywyLjkzYzIuNjQsMCw1LjIxLTEuMDcsNy4wNzktMi45M2MxLjg2LTEuODYsMi45MzEtNC40NCwyLjkzMS03LjA3DQoJUzkwLjIyNywyNzQuNzksODguMzY2LDI3Mi45M3oiLz4NCjxwYXRoIGQ9Ik04OC4zNjYsMzI4LjkzYy0xLjg2OS0xLjg2LTQuNDM5LTIuOTMtNy4wNzktMi45M2MtMi42MzEsMC01LjIsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3DQoJczEuMDY5LDUuMjEsMi45Myw3LjA3YzEuODcsMS44Niw0LjQzOSwyLjkzLDcuMDcsMi45M2MyLjY0LDAsNS4yMS0xLjA3LDcuMDc5LTIuOTNjMS44Ni0xLjg2LDIuOTMxLTQuNDQsMi45MzEtNy4wNw0KCVM5MC4yMjcsMzMwLjc5LDg4LjM2NiwzMjguOTN6Ii8+DQo8cGF0aCBkPSJNODEuMjg3LDM4MmMtMi42MzEsMC01LjIsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3czEuMDY5LDUuMjEsMi45Myw3LjA3DQoJYzEuODU5LDEuODYsNC40MzksMi45Myw3LjA3LDIuOTNjMi42NCwwLDUuMjItMS4wNyw3LjA3OS0yLjkzYzEuODYtMS44NiwyLjkzMS00LjQ0LDIuOTMxLTcuMDdzLTEuMDctNS4yMS0yLjkzMS03LjA3DQoJQzg2LjQ5NywzODMuMDcsODMuOTI3LDM4Miw4MS4yODcsMzgyeiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsMjcwaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwyNzAsMjY2LjAwNywyNzB6Ii8+DQo8cGF0aCBkPSJNNDkxLjAwMiwxMzAuMzJjLTkuNzE1LTUuNjA5LTIxLjAzMy03LjA5OS0zMS44NzEtNC4xOTZjLTEwLjgzNiwyLjkwNC0xOS44OTQsOS44NTQtMjUuNTAyLDE5LjU2OUwzMDcuNzg3LDM2My42NTYNCgljLTAuNjg5LDEuMTk1LTEuMTI1LDIuNTItMS4yNzgsMy44OTFsLTguODU4LDc5LjM0NGMtMC40NCwzLjk0OCwxLjQ5OCw3Ljc4Myw0LjkzOCw5Ljc3YzEuNTUzLDAuODk2LDMuMjc4LDEuMzQsNC45OTksMS4zNA0KCWMyLjA5MiwwLDQuMTc2LTAuNjU1LDUuOTMxLTEuOTQ4bDY0LjI4NC00Ny4zNDRjMS4xMTEtMC44MTgsMi4wNDEtMS44NTcsMi43My0zLjA1MmwxMjUuODQxLTIxNy45NjMNCglDNTE3Ljk1NCwxNjcuNjM4LDUxMS4wNTgsMTQxLjksNDkxLjAwMiwxMzAuMzJ6IE0zMjQuNjg5LDM4NC45NjJsMjguOTQyLDE2LjcxbC0zMy41NjgsMjQuNzIyTDMyNC42ODksMzg0Ljk2MnogTTM2OC4yMTMsMzg2Ljk5Ng0KCWwtMzguMTA1LTIybDEwMC45ODUtMTc0LjkxbDM4LjEwNSwyMkwzNjguMjEzLDM4Ni45OTZ6IE00ODkuMDU0LDE3Ny42OTNsLTkuODU3LDE3LjA3M2wtMzguMTA1LTIybDkuODU3LTE3LjA3Mw0KCWMyLjkzOC01LjA4OSw3LjY4Mi04LjcyOSwxMy4zNTgtMTAuMjVjNS42NzgtMS41MjIsMTEuNjA2LTAuNzQsMTYuNjk0LDIuMTk4YzUuMDg5LDIuOTM4LDguNzI5LDcuNjgyLDEwLjI1LDEzLjM1OA0KCUM0OTIuNzcyLDE2Ni42NzUsNDkxLjk5MiwxNzIuNjA0LDQ4OS4wNTQsMTc3LjY5M3oiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K'
                  );
                  introImg.setAttribute('style', 'width: 1.5em');
                  introImg.setAttribute(
                    'src',
                    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQzg3MDsiIGQ9Ik00NDMsNTAyLjA2M0gxNDljLTExLjA0NiwwLTIwLTguOTU0LTIwLTIwdi0zNzJjMC0xMS4wNDYsOC45NTQtMjAsMjAtMjBoMjk0DQoJYzExLjA0NiwwLDIwLDguOTU0LDIwLDIwdjM3MkM0NjMsNDkzLjEwOSw0NTQuMDQ2LDUwMi4wNjMsNDQzLDUwMi4wNjN6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZEQUEwOyIgZD0iTTQwMyw0NjIuMDYzSDEwOWMtMTEuMDQ2LDAtMjAtOC45NTQtMjAtMjB2LTM3MmMwLTExLjA0Niw4Ljk1NC0yMCwyMC0yMGgyOTQNCgljMTEuMDQ2LDAsMjAsOC45NTQsMjAsMjB2MzcyQzQyMyw0NTMuMTA5LDQxNC4wNDYsNDYyLjA2Myw0MDMsNDYyLjA2M3oiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzYyLjkzNyw0MjJoLTI5NGMtMTEuMDQ2LDAtMjAtOC45NTQtMjAtMjBWMzBjMC0xMS4wNDYsOC45NTQtMjAsMjAtMjBoMjk0YzExLjA0NiwwLDIwLDguOTU0LDIwLDIwDQoJdjM3MkMzODIuOTM3LDQxMy4wNDYsMzczLjk4Miw0MjIsMzYyLjkzNyw0MjJ6Ii8+DQo8cmVjdCB4PSIxMDQuOTQiIHk9Ijg0IiBzdHlsZT0iZmlsbDojQkFFRTgzOyIgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2Ii8+DQo8cGF0aCBkPSJNMzYyLjkzNyw0MzJoLTI5NGMtMTYuNTQyLDAtMzAtMTMuNDU4LTMwLTMwVjIxNi4zMzNjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMGM1LjUyMiwwLDEwLDQuNDc3LDEwLDEwVjQwMg0KCWMwLDUuNTE0LDQuNDg2LDEwLDEwLDEwaDI5NGM1LjUxNCwwLDEwLTQuNDg2LDEwLTEwVjMwYzAtNS41MTQtNC40ODYtMTAtMTAtMTBoLTI5NGMtNS41MTQsMC0xMCw0LjQ4Ni0xMCwxMHYxMDINCgljMCw1LjUyMy00LjQ3OCwxMC0xMCwxMGMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMFYzMGMwLTE2LjU0MiwxMy40NTgtMzAsMzAtMzBoMjk0YzE2LjU0MiwwLDMwLDEzLjQ1OCwzMCwzMHYzNzINCglDMzkyLjkzNyw0MTguNTQyLDM3OS40NzksNDMyLDM2Mi45MzcsNDMyeiIvPg0KPHBhdGggZD0iTTQ4LjkzNywxODYuNzhjLTIuNjMsMC01LjIxLTEuMDctNy4wNy0yLjkzYy0xLjg2LTEuODctMi45My00LjQ0LTIuOTMtNy4wOGMwLTIuNjIsMS4wNjktNS4yLDIuOTMtNy4wNw0KCWMxLjg2LTEuODYsNC40NC0yLjkyLDcuMDctMi45MmMyLjYzLDAsNS4yMSwxLjA2LDcuMDY5LDIuOTJjMS44NiwxLjg3LDIuOTMxLDQuNDQsMi45MzEsNy4wN2MwLDIuNjQtMS4wNyw1LjIyLTIuOTMxLDcuMDgNCglDNTQuMTQ2LDE4NS43MSw1MS41NjYsMTg2Ljc4LDQ4LjkzNywxODYuNzh6Ii8+DQo8cGF0aCBkPSJNODguOTk2LDQ3Mi4wNmMtMi42MywwLTUuMjEtMS4wNi03LjA2OS0yLjkzYy0xLjg2LTEuODYtMi45MzEtNC40My0yLjkzMS03LjA3YzAtMi42MywxLjA3LTUuMjEsMi45MzEtNy4wNw0KCWMxLjg1OS0xLjg2LDQuNDM5LTIuOTMsNy4wNjktMi45M2MyLjY0MSwwLDUuMjEsMS4wNyw3LjA3LDIuOTNzMi45Myw0LjQ0LDIuOTMsNy4wN2MwLDIuNjQtMS4wNjksNS4yMS0yLjkzLDcuMDcNCglDOTQuMjA2LDQ3MSw5MS42MzcsNDcyLjA2LDg4Ljk5Niw0NzIuMDZ6Ii8+DQo8cGF0aCBkPSJNNDAzLDQ3Mi4wNjNIMTI5Yy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDI3NGM1LjUxNCwwLDEwLTQuNDg2LDEwLTEwdi0zOTJjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMA0KCXMxMCw0LjQ3NywxMCwxMHYzOTJDNDMzLDQ1OC42MDUsNDE5LjU0Miw0NzIuMDYzLDQwMyw0NzIuMDYzeiIvPg0KPHBhdGggZD0iTTQ0My4wNjMsNTEyaC0zMTRjLTUuNTIyLDAtMTAtNC40NzctMTAtMTBzNC40NzgtMTAsMTAtMTBoMzE0YzUuNTE0LDAsMTAtNC40ODYsMTAtMTBWOTBjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMA0KCXMxMCw0LjQ3NywxMCwxMHYzOTJDNDczLjA2Myw0OTguNTQyLDQ1OS42MDUsNTEyLDQ0My4wNjMsNTEyeiIvPg0KPHBhdGggZD0iTTIwMC45MzcsMTkwaC05NmMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMFY4NGMwLTUuNTIzLDQuNDc4LTEwLDEwLTEwaDk2YzUuNTIyLDAsMTAsNC40NzcsMTAsMTB2OTYNCglDMjEwLjkzNywxODUuNTIzLDIwNi40NTksMTkwLDIwMC45MzcsMTkweiBNMTE0LjkzNywxNzBoNzZWOTRoLTc2VjE3MHoiLz4NCjxwYXRoIGQ9Ik0xMjguMDM1LDI4Ni4xMjdMMTI4LjAzNSwyODYuMTI3Yy0yLjY1MiwwLTUuMTk1LTEuMDU0LTcuMDcxLTIuOTI5bC0xOS40MzItMTkuNDMyYy0zLjkwNS0zLjkwNS0zLjkwNS0xMC4yMzcsMC0xNC4xNDINCgljMy45MDgtMy45MDQsMTAuMjM4LTMuOTA1LDE0LjE0MywwbDEyLjM2LDEyLjM2MWwyNi41ODMtMjYuNTgzYzMuOTA3LTMuOTA1LDEwLjIzNy0zLjkwNCwxNC4xNDMsMA0KCWMzLjkwNSwzLjkwNSwzLjkwNSwxMC4yMzcsMCwxNC4xNDJsLTMzLjY1NCwzMy42NTRDMTMzLjIzLDI4NS4wNzMsMTMwLjY4OCwyODYuMTI3LDEyOC4wMzUsMjg2LjEyN3oiLz4NCjxwYXRoIGQ9Ik0zMzIuNjA0LDI2OUgyMTUuOTM3Yy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDExNi42NjdjNS41MjIsMCwxMCw0LjQ3NywxMCwxMA0KCUMzNDIuNjA0LDI2NC41MjMsMzM4LjEyNiwyNjksMzMyLjYwNCwyNjl6Ii8+DQo8cGF0aCBkPSJNMzI2LjkzNyw5NGgtNzBjLTUuNTIyLDAtMTAtNC40NzctMTAtMTBzNC40NzgtMTAsMTAtMTBoNzBjNS41MjIsMCwxMCw0LjQ3NywxMCwxMFMzMzIuNDU5LDk0LDMyNi45MzcsOTR6Ii8+DQo8cGF0aCBkPSJNMzI2LjkzNywxNDJoLTcwYy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDcwYzUuNTIyLDAsMTAsNC40NzcsMTAsMTANCglDMzM2LjkzNywxMzcuNTIzLDMzMi40NTksMTQyLDMyNi45MzcsMTQyeiIvPg0KPHBhdGggZD0iTTMyNi45MzcsMTkwaC03MGMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3OC0xMCwxMC0xMGg3MGM1LjUyMiwwLDEwLDQuNDc3LDEwLDEwUzMzMi40NTksMTkwLDMyNi45MzcsMTkweiIvPg0KPHBhdGggZD0iTTEyOC4wMzUsMzYyLjQ5NEwxMjguMDM1LDM2Mi40OTRjLTIuNjUyLDAtNS4xOTUtMS4wNTQtNy4wNzEtMi45MjlsLTE5LjQzMi0xOS40MzJjLTMuOTA1LTMuOTA1LTMuOTA1LTEwLjIzNywwLTE0LjE0Mg0KCWMzLjkwOC0zLjkwNCwxMC4yMzgtMy45MDUsMTQuMTQzLDBsMTIuMzYsMTIuMzYxbDI2LjU4My0yNi41ODNjMy45MDctMy45MDUsMTAuMjM3LTMuOTA0LDE0LjE0MywwDQoJYzMuOTA1LDMuOTA1LDMuOTA1LDEwLjIzNywwLDE0LjE0MmwtMzMuNjU0LDMzLjY1NEMxMzMuMjMsMzYxLjQ0LDEzMC42ODgsMzYyLjQ5NCwxMjguMDM1LDM2Mi40OTR6Ii8+DQo8cGF0aCBkPSJNMzMyLjYwNCwzNDVIMjE1LjkzN2MtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3OC0xMCwxMC0xMGgxMTYuNjY3YzUuNTIyLDAsMTAsNC40NzcsMTAsMTBTMzM4LjEyNiwzNDUsMzMyLjYwNCwzNDV6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=='
                  );
                  apId.setAttribute('style', 'display:none;');
                  listNum.setAttribute('style', 'display:none;');

                  nameTh.textContent = applys[j].user_name;
                  areaTh.textContent = applys[j].ap_area;
                  taskTh.textContent = applys[j].ap_task;
                  apId.textContent = applys[j].ap_id;
                  listNum.textContent = dNum;

                  myTr.appendChild(nameTh);
                  myTr.appendChild(cvTh);
                  myTr.appendChild(introTh);
                  myTr.appendChild(areaTh);
                  myTr.appendChild(taskTh);
                  myTr.appendChild(apId);
                  myTr.appendChild(listNum);
                  cvTh.appendChild(cvLink);
                  cvLink.appendChild(cvImg);
                  introTh.appendChild(introLink);
                  introLink.appendChild(introImg);
                }
              }
            });
          }
        }
      },
      error: function (error) {
        alert('실패');
      },
    });
  }, // save() end
};

Pass.init();

let Fail = {
  init: function () {
    // 불합격
    $('#Fail').on('click', event => {
      event.preventDefault();
      this.save();
    });
  },

  save: function () {
    let data2 = new Array();

    $('input:checkbox[name=APY_CHK]:checked').each(function () {
      // 체크된 체크박스의 value 값을 가지고 온다.
      data2.push(this.value);
    });

    // 데이터 전송 ajax
    $.ajax({
      type: 'POST',
      url: '/application/apply?pass=불합격',
      data: JSON.stringify(data2),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function (result) {
        //대기중목록 다시불러오기
        let modalList = document.querySelector('#modalList');
        let listSuccessfulApplicants = document.querySelector('#listSuccessfulApplicants');
        let listRejectedCandidates = document.querySelector('#listRejectedCandidates');
        let applyModal = document.querySelectorAll('.applyModal');
        let pageNumbers = document.querySelector('#pageNumbers');
        let passPageNumbers = document.querySelector('#passPageNumbers');
        let failPageNumbers = document.querySelector('#failPageNumbers');
        let dtoNum = document.querySelectorAll('.dtoNum');
        let dtoNumInput = document.querySelector('#dtoNumInput');
        let dNum, requestURL, requestPassURL, requestFailURL;

        $('#modalList').empty();
        $('#listSuccessfulApplicants').empty();
        $('#listRejectedCandidates').empty();
        $('#pageNumbers').empty();
        $('#passPageNumbers').empty();
        $('#failPageNumbers').empty();

        dNum = dtoNumInput.value;

        requestURL = `/application/etp/employ/list/${dNum}?page=1&pass=대기중`;
        requestPassURL = `/application/etp/employ/list/${dNum}?page=1&pass=합격`;
        requestFailURL = `/application/etp/employ/list/${dNum}?page=1&pass=불합격`;

        let request = new XMLHttpRequest();
        let requestPass = new XMLHttpRequest();
        let requestFail = new XMLHttpRequest();

        request.open('GET', requestURL);
        requestPass.open('GET', requestPassURL);
        requestFail.open('GET', requestFailURL);

        request.responseType = 'json';
        requestPass.responseType = 'json';
        requestFail.responseType = 'json';

        request.send();
        requestPass.send();
        requestFail.send();

        request.onload = function () {
          let jsonObj = request.response;
          apply(jsonObj);
        };

        requestPass.onload = function () {
          let jsonObj = requestPass.response;
          applyPass(jsonObj);
        };

        requestFail.onload = function () {
          let jsonObj = requestFail.response;
          applyFail(jsonObj);
        };

        function apply(jsonObj) {
          let applys = jsonObj['dtoList'];
          let userId;
          let introNum;
          for (let j = 0; j < applys.length; j++) {
            let myTr = document.createElement('tr');
            modalList.appendChild(myTr);

            let checkTh = document.createElement('td');
            let nameTh = document.createElement('td');
            let cvTh = document.createElement('td');
            let introTh = document.createElement('td');
            let areaTh = document.createElement('td');
            let taskTh = document.createElement('td');
            let stateTh = document.createElement('td');
            let checkBox = document.createElement('input');
            checkBox.setAttribute('type', 'checkbox');
            checkBox.setAttribute('name', 'APY_CHK');
            checkBox.setAttribute('value', applys[j].ap_id);
            let cvLink = document.createElement('a');
            let introLink = document.createElement('a');
            let cvImg = document.createElement('img');
            let introImg = document.createElement('img');
            let apId = document.createElement('td');
            let listNum = document.createElement('td');
            userId = applys[j].user_id;
            introNum = applys[j].intro_num;
            listNum.setAttribute('class', 'listNum');
            cvLink.setAttribute('href', '/application/etp/cv/read?id=' + userId);
            cvLink.setAttribute('target', '_black');
            introLink.setAttribute('href', '/application/etp/introduce/read?num=' + introNum);
            introLink.setAttribute('target', '_black');
            cvImg.setAttribute('style', 'width: 1.5em');
            cvImg.setAttribute(
              'src',
              'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zOTQuMDA3LDUwMmgtMzY0Yy0xMS4wNDYsMC0yMC04Ljk1NC0yMC0yMFYzMGMwLTExLjA0Niw4Ljk1NC0yMCwyMC0yMGgzNjRjMTEuMDQ2LDAsMjAsOC45NTQsMjAsMjANCgl2NDUyQzQxNC4wMDcsNDkzLjA0Niw0MDUuMDUzLDUwMiwzOTQuMDA3LDUwMnoiLz4NCjxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZFNjY2MzsiIGN4PSIyMTIuMDEiIGN5PSIxNDYiIHI9IjgyIi8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZDREFDOyIgZD0iTTIzOC4wMDcsMTM1LjV2Ni41YzAsMTQuMzU5LTExLjY0MSwyNi0yNiwyNmwwLDBsMCwwYy0xNC4zNTksMC0yNi0xMS42NDEtMjYtMjZ2LTYuNQ0KCWMwLTE0LjM1OSwxMS42NDEtMjYsMjYtMjZsMCwwQzIyNi4zNjYsMTA5LjUsMjM4LjAwNywxMjEuMTQxLDIzOC4wMDcsMTM1LjV6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojQTVEREZGOyIgZD0iTTIxMi4wMDcsMTY4TDIxMi4wMDcsMTY4Yy0yNS4zOCwwLTQ3LjA2NCwxNS43NjctNTUuODMyLDM4LjAzMw0KCUMxNzAuODE1LDIxOS42NTUsMTkwLjQzMiwyMjgsMjEyLjAwNywyMjhzNDEuMTkyLTguMzQ1LDU1LjgzMi0yMS45NjdDMjU5LjA3MSwxODMuNzY3LDIzNy4zODcsMTY4LDIxMi4wMDcsMTY4eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQkM1MzsiIGQ9Ik00MzYuNTc0LDE2MC41OWw1LjcxNC05Ljg5N2M4LjgzNy0xNS4zMDUsMjguNDA3LTIwLjU0OSw0My43MTMtMTEuNzEzbDAsMA0KCWMxNS4zMDUsOC44MzcsMjAuNTQ5LDI4LjQwNywxMS43MTMsNDMuNzEzTDM3MS44NzMsNDAwLjY1NmwtNTUuNDI2LTMybDU0LjI4Mi05NC4wMkw0MzYuNTc0LDE2MC41OXoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRTY2NjM7IiBkPSJNNDg2LjAwMiwxMzguOThMNDg2LjAwMiwxMzguOThjLTE1LjMwNS04LjgzNy0zNC44NzYtMy41OTMtNDMuNzEzLDExLjcxM2wtMTQuODU3LDI1LjczM2w1NS40MjYsMzINCglsMTQuODU3LTI1LjczM0M1MDYuNTUxLDE2Ny4zODgsNTAxLjMwNywxNDcuODE3LDQ4Ni4wMDIsMTM4Ljk4eiIvPg0KPHBvbHlnb24gc3R5bGU9ImZpbGw6IzlBRDhGRjsiIHBvaW50cz0iMzcxLjg3Myw0MDAuNjU2IDMwNy41ODksNDQ4IDMxNi40NDcsMzY4LjY1NiAiLz4NCjxwYXRoIGQ9Ik00MTQuMDA3LDM5OC4zMjhjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBWNDgyYzAsNS41MTQtNC40ODYsMTAtMTAsMTBoLTM2NGMtNS41MTQsMC0xMC00LjQ4Ni0xMC0xMFYzMA0KCWMwLTUuNTE0LDQuNDg2LTEwLDEwLTEwaDM2NGM1LjUxNCwwLDEwLDQuNDg2LDEwLDEwdjEwOC43NWMwLDUuNTIzLDQuNDc4LDEwLDEwLDEwczEwLTQuNDc3LDEwLTEwVjMwYzAtMTYuNTQyLTEzLjQ1OC0zMC0zMC0zMA0KCWgtMzY0Yy0xNi41NDIsMC0zMCwxMy40NTgtMzAsMzB2NDUyYzAsMTYuNTQyLDEzLjQ1OCwzMCwzMCwzMGgzNjRjMTYuNTQyLDAsMzAtMTMuNDU4LDMwLTMwdi03My42NzINCglDNDI0LjAwNyw0MDIuODA1LDQxOS41MjksMzk4LjMyOCw0MTQuMDA3LDM5OC4zMjh6Ii8+DQo8cGF0aCBkPSJNMzA0LjAwNywxNDZjMC01MC43MjktNDEuMjcxLTkyLTkyLTkycy05Miw0MS4yNzEtOTIsOTJjMCwyNi4zMTcsMTEuMTEsNTAuMDg1LDI4Ljg4Miw2Ni44NjkNCgljMC4zMzMsMC4zNTYsMC42ODcsMC42OTMsMS4wNzQsMWMxNi4zNzEsMTQuOTc5LDM4LjE1OCwyNC4xMyw2Mi4wNDMsMjQuMTNzNDUuNjcyLTkuMTUyLDYyLjA0My0yNC4xMw0KCWMwLjM4Ny0wLjMwNywwLjc0MS0wLjY0NSwxLjA3NC0xQzI5Mi44OTcsMTk2LjA4NSwzMDQuMDA3LDE3Mi4zMTcsMzA0LjAwNywxNDZ6IE0yMTIuMDA3LDc0YzM5LjcwMSwwLDcyLDMyLjI5OSw3Miw3Mg0KCWMwLDE1Ljk2Ny01LjIzMSwzMC43My0xNC4wNiw0Mi42ODNjLTcuMzc1LTEwLjkzOC0xNy41OTYtMTkuNDQ1LTI5LjQ2My0yNC42OTdjNC43MS02LjA4Nyw3LjUyMy0xMy43MTIsNy41MjMtMjEuOTg2di02LjUNCgljMC0xOS44NTEtMTYuMTQ5LTM2LTM2LTM2cy0zNiwxNi4xNDktMzYsMzZ2Ni41YzAsOC4yNzQsMi44MTMsMTUuODk5LDcuNTIzLDIxLjk4NmMtMTEuODY3LDUuMjUyLTIyLjA4OCwxMy43NTktMjkuNDYzLDI0LjY5Nw0KCWMtOC44MjktMTEuOTUzLTE0LjA2LTI2LjcxNi0xNC4wNi00Mi42ODNDMTQwLjAwNywxMDYuMjk5LDE3Mi4zMDYsNzQsMjEyLjAwNyw3NHogTTE5Ni4wMDcsMTQydi02LjVjMC04LjgyMiw3LjE3OC0xNiwxNi0xNg0KCXMxNiw3LjE3OCwxNiwxNnY2LjVjMCw4LjgyMi03LjE3OCwxNi0xNiwxNlMxOTYuMDA3LDE1MC44MjIsMTk2LjAwNywxNDJ6IE0xNjguNTE2LDIwMy4zMzINCgljOC43ODktMTUuNTg1LDI1LjE5LTI1LjMzMiw0My40OTEtMjUuMzMyczM0LjcwMiw5Ljc0Nyw0My40OTEsMjUuMzMyQzI0My40MDUsMjEyLjUyOCwyMjguMzM2LDIxOCwyMTIuMDA3LDIxOA0KCVMxODAuNjA4LDIxMi41MjgsMTY4LjUxNiwyMDMuMzMyeiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsNDM4aC01NGMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGg1NGM1LjUyMiwwLDEwLTQuNDc3LDEwLTEwUzI3MS41MjksNDM4LDI2Ni4wMDcsNDM4eiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsMzgyaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwzODIsMjY2LjAwNywzODJ6Ii8+DQo8cGF0aCBkPSJNMjY2LjAwNywzMjZoLTE0MmMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGgxNDJjNS41MjIsMCwxMC00LjQ3NywxMC0xMFMyNzEuNTI5LDMyNiwyNjYuMDA3LDMyNnoiLz4NCjxwYXRoIGQ9Ik04OC4zNjYsMjcyLjkzYy0xLjg1OS0xLjg2LTQuNDM5LTIuOTMtNy4wNzktMi45M2MtMi42MzEsMC01LjIxMSwxLjA3LTcuMDcsMi45M2MtMS44NiwxLjg2LTIuOTMsNC40NC0yLjkzLDcuMDcNCglzMS4wNjksNS4yMSwyLjkzLDcuMDdjMS44NywxLjg2LDQuNDM5LDIuOTMsNy4wNywyLjkzYzIuNjQsMCw1LjIxLTEuMDcsNy4wNzktMi45M2MxLjg2LTEuODYsMi45MzEtNC40NCwyLjkzMS03LjA3DQoJUzkwLjIyNywyNzQuNzksODguMzY2LDI3Mi45M3oiLz4NCjxwYXRoIGQ9Ik04OC4zNjYsMzI4LjkzYy0xLjg2OS0xLjg2LTQuNDM5LTIuOTMtNy4wNzktMi45M2MtMi42MzEsMC01LjIsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3DQoJczEuMDY5LDUuMjEsMi45Myw3LjA3YzEuODcsMS44Niw0LjQzOSwyLjkzLDcuMDcsMi45M2MyLjY0LDAsNS4yMS0xLjA3LDcuMDc5LTIuOTNjMS44Ni0xLjg2LDIuOTMxLTQuNDQsMi45MzEtNy4wNw0KCVM5MC4yMjcsMzMwLjc5LDg4LjM2NiwzMjguOTN6Ii8+DQo8cGF0aCBkPSJNODEuMjg3LDM4MmMtMi42MzEsMC01LjIsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3czEuMDY5LDUuMjEsMi45Myw3LjA3DQoJYzEuODU5LDEuODYsNC40MzksMi45Myw3LjA3LDIuOTNjMi42NCwwLDUuMjItMS4wNyw3LjA3OS0yLjkzYzEuODYtMS44NiwyLjkzMS00LjQ0LDIuOTMxLTcuMDdzLTEuMDctNS4yMS0yLjkzMS03LjA3DQoJQzg2LjQ5NywzODMuMDcsODMuOTI3LDM4Miw4MS4yODcsMzgyeiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsMjcwaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwyNzAsMjY2LjAwNywyNzB6Ii8+DQo8cGF0aCBkPSJNNDkxLjAwMiwxMzAuMzJjLTkuNzE1LTUuNjA5LTIxLjAzMy03LjA5OS0zMS44NzEtNC4xOTZjLTEwLjgzNiwyLjkwNC0xOS44OTQsOS44NTQtMjUuNTAyLDE5LjU2OUwzMDcuNzg3LDM2My42NTYNCgljLTAuNjg5LDEuMTk1LTEuMTI1LDIuNTItMS4yNzgsMy44OTFsLTguODU4LDc5LjM0NGMtMC40NCwzLjk0OCwxLjQ5OCw3Ljc4Myw0LjkzOCw5Ljc3YzEuNTUzLDAuODk2LDMuMjc4LDEuMzQsNC45OTksMS4zNA0KCWMyLjA5MiwwLDQuMTc2LTAuNjU1LDUuOTMxLTEuOTQ4bDY0LjI4NC00Ny4zNDRjMS4xMTEtMC44MTgsMi4wNDEtMS44NTcsMi43My0zLjA1MmwxMjUuODQxLTIxNy45NjMNCglDNTE3Ljk1NCwxNjcuNjM4LDUxMS4wNTgsMTQxLjksNDkxLjAwMiwxMzAuMzJ6IE0zMjQuNjg5LDM4NC45NjJsMjguOTQyLDE2LjcxbC0zMy41NjgsMjQuNzIyTDMyNC42ODksMzg0Ljk2MnogTTM2OC4yMTMsMzg2Ljk5Ng0KCWwtMzguMTA1LTIybDEwMC45ODUtMTc0LjkxbDM4LjEwNSwyMkwzNjguMjEzLDM4Ni45OTZ6IE00ODkuMDU0LDE3Ny42OTNsLTkuODU3LDE3LjA3M2wtMzguMTA1LTIybDkuODU3LTE3LjA3Mw0KCWMyLjkzOC01LjA4OSw3LjY4Mi04LjcyOSwxMy4zNTgtMTAuMjVjNS42NzgtMS41MjIsMTEuNjA2LTAuNzQsMTYuNjk0LDIuMTk4YzUuMDg5LDIuOTM4LDguNzI5LDcuNjgyLDEwLjI1LDEzLjM1OA0KCUM0OTIuNzcyLDE2Ni42NzUsNDkxLjk5MiwxNzIuNjA0LDQ4OS4wNTQsMTc3LjY5M3oiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K'
            );
            introImg.setAttribute('style', 'width: 1.5em');
            introImg.setAttribute(
              'src',
              'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQzg3MDsiIGQ9Ik00NDMsNTAyLjA2M0gxNDljLTExLjA0NiwwLTIwLTguOTU0LTIwLTIwdi0zNzJjMC0xMS4wNDYsOC45NTQtMjAsMjAtMjBoMjk0DQoJYzExLjA0NiwwLDIwLDguOTU0LDIwLDIwdjM3MkM0NjMsNDkzLjEwOSw0NTQuMDQ2LDUwMi4wNjMsNDQzLDUwMi4wNjN6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZEQUEwOyIgZD0iTTQwMyw0NjIuMDYzSDEwOWMtMTEuMDQ2LDAtMjAtOC45NTQtMjAtMjB2LTM3MmMwLTExLjA0Niw4Ljk1NC0yMCwyMC0yMGgyOTQNCgljMTEuMDQ2LDAsMjAsOC45NTQsMjAsMjB2MzcyQzQyMyw0NTMuMTA5LDQxNC4wNDYsNDYyLjA2Myw0MDMsNDYyLjA2M3oiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzYyLjkzNyw0MjJoLTI5NGMtMTEuMDQ2LDAtMjAtOC45NTQtMjAtMjBWMzBjMC0xMS4wNDYsOC45NTQtMjAsMjAtMjBoMjk0YzExLjA0NiwwLDIwLDguOTU0LDIwLDIwDQoJdjM3MkMzODIuOTM3LDQxMy4wNDYsMzczLjk4Miw0MjIsMzYyLjkzNyw0MjJ6Ii8+DQo8cmVjdCB4PSIxMDQuOTQiIHk9Ijg0IiBzdHlsZT0iZmlsbDojQkFFRTgzOyIgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2Ii8+DQo8cGF0aCBkPSJNMzYyLjkzNyw0MzJoLTI5NGMtMTYuNTQyLDAtMzAtMTMuNDU4LTMwLTMwVjIxNi4zMzNjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMGM1LjUyMiwwLDEwLDQuNDc3LDEwLDEwVjQwMg0KCWMwLDUuNTE0LDQuNDg2LDEwLDEwLDEwaDI5NGM1LjUxNCwwLDEwLTQuNDg2LDEwLTEwVjMwYzAtNS41MTQtNC40ODYtMTAtMTAtMTBoLTI5NGMtNS41MTQsMC0xMCw0LjQ4Ni0xMCwxMHYxMDINCgljMCw1LjUyMy00LjQ3OCwxMC0xMCwxMGMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMFYzMGMwLTE2LjU0MiwxMy40NTgtMzAsMzAtMzBoMjk0YzE2LjU0MiwwLDMwLDEzLjQ1OCwzMCwzMHYzNzINCglDMzkyLjkzNyw0MTguNTQyLDM3OS40NzksNDMyLDM2Mi45MzcsNDMyeiIvPg0KPHBhdGggZD0iTTQ4LjkzNywxODYuNzhjLTIuNjMsMC01LjIxLTEuMDctNy4wNy0yLjkzYy0xLjg2LTEuODctMi45My00LjQ0LTIuOTMtNy4wOGMwLTIuNjIsMS4wNjktNS4yLDIuOTMtNy4wNw0KCWMxLjg2LTEuODYsNC40NC0yLjkyLDcuMDctMi45MmMyLjYzLDAsNS4yMSwxLjA2LDcuMDY5LDIuOTJjMS44NiwxLjg3LDIuOTMxLDQuNDQsMi45MzEsNy4wN2MwLDIuNjQtMS4wNyw1LjIyLTIuOTMxLDcuMDgNCglDNTQuMTQ2LDE4NS43MSw1MS41NjYsMTg2Ljc4LDQ4LjkzNywxODYuNzh6Ii8+DQo8cGF0aCBkPSJNODguOTk2LDQ3Mi4wNmMtMi42MywwLTUuMjEtMS4wNi03LjA2OS0yLjkzYy0xLjg2LTEuODYtMi45MzEtNC40My0yLjkzMS03LjA3YzAtMi42MywxLjA3LTUuMjEsMi45MzEtNy4wNw0KCWMxLjg1OS0xLjg2LDQuNDM5LTIuOTMsNy4wNjktMi45M2MyLjY0MSwwLDUuMjEsMS4wNyw3LjA3LDIuOTNzMi45Myw0LjQ0LDIuOTMsNy4wN2MwLDIuNjQtMS4wNjksNS4yMS0yLjkzLDcuMDcNCglDOTQuMjA2LDQ3MSw5MS42MzcsNDcyLjA2LDg4Ljk5Niw0NzIuMDZ6Ii8+DQo8cGF0aCBkPSJNNDAzLDQ3Mi4wNjNIMTI5Yy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDI3NGM1LjUxNCwwLDEwLTQuNDg2LDEwLTEwdi0zOTJjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMA0KCXMxMCw0LjQ3NywxMCwxMHYzOTJDNDMzLDQ1OC42MDUsNDE5LjU0Miw0NzIuMDYzLDQwMyw0NzIuMDYzeiIvPg0KPHBhdGggZD0iTTQ0My4wNjMsNTEyaC0zMTRjLTUuNTIyLDAtMTAtNC40NzctMTAtMTBzNC40NzgtMTAsMTAtMTBoMzE0YzUuNTE0LDAsMTAtNC40ODYsMTAtMTBWOTBjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMA0KCXMxMCw0LjQ3NywxMCwxMHYzOTJDNDczLjA2Myw0OTguNTQyLDQ1OS42MDUsNTEyLDQ0My4wNjMsNTEyeiIvPg0KPHBhdGggZD0iTTIwMC45MzcsMTkwaC05NmMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMFY4NGMwLTUuNTIzLDQuNDc4LTEwLDEwLTEwaDk2YzUuNTIyLDAsMTAsNC40NzcsMTAsMTB2OTYNCglDMjEwLjkzNywxODUuNTIzLDIwNi40NTksMTkwLDIwMC45MzcsMTkweiBNMTE0LjkzNywxNzBoNzZWOTRoLTc2VjE3MHoiLz4NCjxwYXRoIGQ9Ik0xMjguMDM1LDI4Ni4xMjdMMTI4LjAzNSwyODYuMTI3Yy0yLjY1MiwwLTUuMTk1LTEuMDU0LTcuMDcxLTIuOTI5bC0xOS40MzItMTkuNDMyYy0zLjkwNS0zLjkwNS0zLjkwNS0xMC4yMzcsMC0xNC4xNDINCgljMy45MDgtMy45MDQsMTAuMjM4LTMuOTA1LDE0LjE0MywwbDEyLjM2LDEyLjM2MWwyNi41ODMtMjYuNTgzYzMuOTA3LTMuOTA1LDEwLjIzNy0zLjkwNCwxNC4xNDMsMA0KCWMzLjkwNSwzLjkwNSwzLjkwNSwxMC4yMzcsMCwxNC4xNDJsLTMzLjY1NCwzMy42NTRDMTMzLjIzLDI4NS4wNzMsMTMwLjY4OCwyODYuMTI3LDEyOC4wMzUsMjg2LjEyN3oiLz4NCjxwYXRoIGQ9Ik0zMzIuNjA0LDI2OUgyMTUuOTM3Yy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDExNi42NjdjNS41MjIsMCwxMCw0LjQ3NywxMCwxMA0KCUMzNDIuNjA0LDI2NC41MjMsMzM4LjEyNiwyNjksMzMyLjYwNCwyNjl6Ii8+DQo8cGF0aCBkPSJNMzI2LjkzNyw5NGgtNzBjLTUuNTIyLDAtMTAtNC40NzctMTAtMTBzNC40NzgtMTAsMTAtMTBoNzBjNS41MjIsMCwxMCw0LjQ3NywxMCwxMFMzMzIuNDU5LDk0LDMyNi45MzcsOTR6Ii8+DQo8cGF0aCBkPSJNMzI2LjkzNywxNDJoLTcwYy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDcwYzUuNTIyLDAsMTAsNC40NzcsMTAsMTANCglDMzM2LjkzNywxMzcuNTIzLDMzMi40NTksMTQyLDMyNi45MzcsMTQyeiIvPg0KPHBhdGggZD0iTTMyNi45MzcsMTkwaC03MGMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3OC0xMCwxMC0xMGg3MGM1LjUyMiwwLDEwLDQuNDc3LDEwLDEwUzMzMi40NTksMTkwLDMyNi45MzcsMTkweiIvPg0KPHBhdGggZD0iTTEyOC4wMzUsMzYyLjQ5NEwxMjguMDM1LDM2Mi40OTRjLTIuNjUyLDAtNS4xOTUtMS4wNTQtNy4wNzEtMi45MjlsLTE5LjQzMi0xOS40MzJjLTMuOTA1LTMuOTA1LTMuOTA1LTEwLjIzNywwLTE0LjE0Mg0KCWMzLjkwOC0zLjkwNCwxMC4yMzgtMy45MDUsMTQuMTQzLDBsMTIuMzYsMTIuMzYxbDI2LjU4My0yNi41ODNjMy45MDctMy45MDUsMTAuMjM3LTMuOTA0LDE0LjE0MywwDQoJYzMuOTA1LDMuOTA1LDMuOTA1LDEwLjIzNywwLDE0LjE0MmwtMzMuNjU0LDMzLjY1NEMxMzMuMjMsMzYxLjQ0LDEzMC42ODgsMzYyLjQ5NCwxMjguMDM1LDM2Mi40OTR6Ii8+DQo8cGF0aCBkPSJNMzMyLjYwNCwzNDVIMjE1LjkzN2MtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3OC0xMCwxMC0xMGgxMTYuNjY3YzUuNTIyLDAsMTAsNC40NzcsMTAsMTBTMzM4LjEyNiwzNDUsMzMyLjYwNCwzNDV6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=='
            );
            apId.setAttribute('style', 'display:none;');
            listNum.setAttribute('style', 'display:none;');

            nameTh.textContent = applys[j].user_name;
            areaTh.textContent = applys[j].ap_area;
            taskTh.textContent = applys[j].ap_task;
            stateTh.textContent = applys[j].ap_pass;
            apId.textContent = applys[j].ap_id;
            listNum.textContent = dNum;

            myTr.appendChild(checkTh);
            myTr.appendChild(nameTh);
            myTr.appendChild(cvTh);
            myTr.appendChild(introTh);
            myTr.appendChild(areaTh);
            myTr.appendChild(taskTh);
            myTr.appendChild(stateTh);
            myTr.appendChild(apId);
            myTr.appendChild(listNum);
            checkTh.appendChild(checkBox);
            cvTh.appendChild(cvLink);
            cvLink.appendChild(cvImg);
            introTh.appendChild(introLink);
            introLink.appendChild(introImg);
          }
          //페이지네이션
          let totalPage = jsonObj['totalPage'];
          let pageNumbers = document.querySelector('#pageNumbers');
          let pageNumber;
          for (let p = 0; p < totalPage; p++) {
            let page = document.createElement('a');
            page.setAttribute('class', 'page-link');
            page.textContent = p + 1;

            pageNumbers.appendChild(page);

            pageNumber = document.querySelectorAll('.page-link');

            pageNumber[p].addEventListener('click', () => {
              $('#modalList').empty();
              $('.page-link').removeClass('active');

              pageNumber[p].classList.add('active');

              requestURL = `/application/etp/employ/list/${dNum}?page=${p + 1}&pass=대기중`;

              let request = new XMLHttpRequest();
              request.open('GET', requestURL);

              request.responseType = 'json';
              request.send();

              request.onload = function () {
                let jsonObj = request.response;
                apply2(jsonObj);
              };

              function apply2(jsonObj) {
                let applys = jsonObj['dtoList'];
                let userId;
                let introNum;
                for (let j = 0; j < applys.length; j++) {
                  let myTr = document.createElement('tr');
                  modalList.appendChild(myTr);

                  let checkTh = document.createElement('td');
                  let nameTh = document.createElement('td');
                  let cvTh = document.createElement('td');
                  let introTh = document.createElement('td');
                  let areaTh = document.createElement('td');
                  let taskTh = document.createElement('td');
                  let stateTh = document.createElement('td');
                  let checkBox = document.createElement('input');
                  checkBox.setAttribute('type', 'checkbox');
                  checkBox.setAttribute('name', 'APY_CHK');
                  checkBox.setAttribute('value', applys[j].ap_id);
                  let cvLink = document.createElement('a');
                  let introLink = document.createElement('a');
                  let cvImg = document.createElement('img');
                  let introImg = document.createElement('img');
                  let apId = document.createElement('td');
                  let listNum = document.createElement('td');
                  userId = applys[j].user_id;
                  introNum = applys[j].intro_num;
                  listNum.setAttribute('class', 'listNum');
                  cvLink.setAttribute('href', '/application/etp/cv/read?id=' + userId);
                  cvLink.setAttribute('target', '_black');
                  introLink.setAttribute('href', '/application/etp/introduce/read?num=' + introNum);
                  introLink.setAttribute('target', '_black');
                  cvImg.setAttribute('style', 'width: 1.5em');
                  cvImg.setAttribute(
                    'src',
                    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zOTQuMDA3LDUwMmgtMzY0Yy0xMS4wNDYsMC0yMC04Ljk1NC0yMC0yMFYzMGMwLTExLjA0Niw4Ljk1NC0yMCwyMC0yMGgzNjRjMTEuMDQ2LDAsMjAsOC45NTQsMjAsMjANCgl2NDUyQzQxNC4wMDcsNDkzLjA0Niw0MDUuMDUzLDUwMiwzOTQuMDA3LDUwMnoiLz4NCjxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZFNjY2MzsiIGN4PSIyMTIuMDEiIGN5PSIxNDYiIHI9IjgyIi8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZDREFDOyIgZD0iTTIzOC4wMDcsMTM1LjV2Ni41YzAsMTQuMzU5LTExLjY0MSwyNi0yNiwyNmwwLDBsMCwwYy0xNC4zNTksMC0yNi0xMS42NDEtMjYtMjZ2LTYuNQ0KCWMwLTE0LjM1OSwxMS42NDEtMjYsMjYtMjZsMCwwQzIyNi4zNjYsMTA5LjUsMjM4LjAwNywxMjEuMTQxLDIzOC4wMDcsMTM1LjV6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojQTVEREZGOyIgZD0iTTIxMi4wMDcsMTY4TDIxMi4wMDcsMTY4Yy0yNS4zOCwwLTQ3LjA2NCwxNS43NjctNTUuODMyLDM4LjAzMw0KCUMxNzAuODE1LDIxOS42NTUsMTkwLjQzMiwyMjgsMjEyLjAwNywyMjhzNDEuMTkyLTguMzQ1LDU1LjgzMi0yMS45NjdDMjU5LjA3MSwxODMuNzY3LDIzNy4zODcsMTY4LDIxMi4wMDcsMTY4eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQkM1MzsiIGQ9Ik00MzYuNTc0LDE2MC41OWw1LjcxNC05Ljg5N2M4LjgzNy0xNS4zMDUsMjguNDA3LTIwLjU0OSw0My43MTMtMTEuNzEzbDAsMA0KCWMxNS4zMDUsOC44MzcsMjAuNTQ5LDI4LjQwNywxMS43MTMsNDMuNzEzTDM3MS44NzMsNDAwLjY1NmwtNTUuNDI2LTMybDU0LjI4Mi05NC4wMkw0MzYuNTc0LDE2MC41OXoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRTY2NjM7IiBkPSJNNDg2LjAwMiwxMzguOThMNDg2LjAwMiwxMzguOThjLTE1LjMwNS04LjgzNy0zNC44NzYtMy41OTMtNDMuNzEzLDExLjcxM2wtMTQuODU3LDI1LjczM2w1NS40MjYsMzINCglsMTQuODU3LTI1LjczM0M1MDYuNTUxLDE2Ny4zODgsNTAxLjMwNywxNDcuODE3LDQ4Ni4wMDIsMTM4Ljk4eiIvPg0KPHBvbHlnb24gc3R5bGU9ImZpbGw6IzlBRDhGRjsiIHBvaW50cz0iMzcxLjg3Myw0MDAuNjU2IDMwNy41ODksNDQ4IDMxNi40NDcsMzY4LjY1NiAiLz4NCjxwYXRoIGQ9Ik00MTQuMDA3LDM5OC4zMjhjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBWNDgyYzAsNS41MTQtNC40ODYsMTAtMTAsMTBoLTM2NGMtNS41MTQsMC0xMC00LjQ4Ni0xMC0xMFYzMA0KCWMwLTUuNTE0LDQuNDg2LTEwLDEwLTEwaDM2NGM1LjUxNCwwLDEwLDQuNDg2LDEwLDEwdjEwOC43NWMwLDUuNTIzLDQuNDc4LDEwLDEwLDEwczEwLTQuNDc3LDEwLTEwVjMwYzAtMTYuNTQyLTEzLjQ1OC0zMC0zMC0zMA0KCWgtMzY0Yy0xNi41NDIsMC0zMCwxMy40NTgtMzAsMzB2NDUyYzAsMTYuNTQyLDEzLjQ1OCwzMCwzMCwzMGgzNjRjMTYuNTQyLDAsMzAtMTMuNDU4LDMwLTMwdi03My42NzINCglDNDI0LjAwNyw0MDIuODA1LDQxOS41MjksMzk4LjMyOCw0MTQuMDA3LDM5OC4zMjh6Ii8+DQo8cGF0aCBkPSJNMzA0LjAwNywxNDZjMC01MC43MjktNDEuMjcxLTkyLTkyLTkycy05Miw0MS4yNzEtOTIsOTJjMCwyNi4zMTcsMTEuMTEsNTAuMDg1LDI4Ljg4Miw2Ni44NjkNCgljMC4zMzMsMC4zNTYsMC42ODcsMC42OTMsMS4wNzQsMWMxNi4zNzEsMTQuOTc5LDM4LjE1OCwyNC4xMyw2Mi4wNDMsMjQuMTNzNDUuNjcyLTkuMTUyLDYyLjA0My0yNC4xMw0KCWMwLjM4Ny0wLjMwNywwLjc0MS0wLjY0NSwxLjA3NC0xQzI5Mi44OTcsMTk2LjA4NSwzMDQuMDA3LDE3Mi4zMTcsMzA0LjAwNywxNDZ6IE0yMTIuMDA3LDc0YzM5LjcwMSwwLDcyLDMyLjI5OSw3Miw3Mg0KCWMwLDE1Ljk2Ny01LjIzMSwzMC43My0xNC4wNiw0Mi42ODNjLTcuMzc1LTEwLjkzOC0xNy41OTYtMTkuNDQ1LTI5LjQ2My0yNC42OTdjNC43MS02LjA4Nyw3LjUyMy0xMy43MTIsNy41MjMtMjEuOTg2di02LjUNCgljMC0xOS44NTEtMTYuMTQ5LTM2LTM2LTM2cy0zNiwxNi4xNDktMzYsMzZ2Ni41YzAsOC4yNzQsMi44MTMsMTUuODk5LDcuNTIzLDIxLjk4NmMtMTEuODY3LDUuMjUyLTIyLjA4OCwxMy43NTktMjkuNDYzLDI0LjY5Nw0KCWMtOC44MjktMTEuOTUzLTE0LjA2LTI2LjcxNi0xNC4wNi00Mi42ODNDMTQwLjAwNywxMDYuMjk5LDE3Mi4zMDYsNzQsMjEyLjAwNyw3NHogTTE5Ni4wMDcsMTQydi02LjVjMC04LjgyMiw3LjE3OC0xNiwxNi0xNg0KCXMxNiw3LjE3OCwxNiwxNnY2LjVjMCw4LjgyMi03LjE3OCwxNi0xNiwxNlMxOTYuMDA3LDE1MC44MjIsMTk2LjAwNywxNDJ6IE0xNjguNTE2LDIwMy4zMzINCgljOC43ODktMTUuNTg1LDI1LjE5LTI1LjMzMiw0My40OTEtMjUuMzMyczM0LjcwMiw5Ljc0Nyw0My40OTEsMjUuMzMyQzI0My40MDUsMjEyLjUyOCwyMjguMzM2LDIxOCwyMTIuMDA3LDIxOA0KCVMxODAuNjA4LDIxMi41MjgsMTY4LjUxNiwyMDMuMzMyeiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsNDM4aC01NGMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGg1NGM1LjUyMiwwLDEwLTQuNDc3LDEwLTEwUzI3MS41MjksNDM4LDI2Ni4wMDcsNDM4eiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsMzgyaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwzODIsMjY2LjAwNywzODJ6Ii8+DQo8cGF0aCBkPSJNMjY2LjAwNywzMjZoLTE0MmMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGgxNDJjNS41MjIsMCwxMC00LjQ3NywxMC0xMFMyNzEuNTI5LDMyNiwyNjYuMDA3LDMyNnoiLz4NCjxwYXRoIGQ9Ik04OC4zNjYsMjcyLjkzYy0xLjg1OS0xLjg2LTQuNDM5LTIuOTMtNy4wNzktMi45M2MtMi42MzEsMC01LjIxMSwxLjA3LTcuMDcsMi45M2MtMS44NiwxLjg2LTIuOTMsNC40NC0yLjkzLDcuMDcNCglzMS4wNjksNS4yMSwyLjkzLDcuMDdjMS44NywxLjg2LDQuNDM5LDIuOTMsNy4wNywyLjkzYzIuNjQsMCw1LjIxLTEuMDcsNy4wNzktMi45M2MxLjg2LTEuODYsMi45MzEtNC40NCwyLjkzMS03LjA3DQoJUzkwLjIyNywyNzQuNzksODguMzY2LDI3Mi45M3oiLz4NCjxwYXRoIGQ9Ik04OC4zNjYsMzI4LjkzYy0xLjg2OS0xLjg2LTQuNDM5LTIuOTMtNy4wNzktMi45M2MtMi42MzEsMC01LjIsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3DQoJczEuMDY5LDUuMjEsMi45Myw3LjA3YzEuODcsMS44Niw0LjQzOSwyLjkzLDcuMDcsMi45M2MyLjY0LDAsNS4yMS0xLjA3LDcuMDc5LTIuOTNjMS44Ni0xLjg2LDIuOTMxLTQuNDQsMi45MzEtNy4wNw0KCVM5MC4yMjcsMzMwLjc5LDg4LjM2NiwzMjguOTN6Ii8+DQo8cGF0aCBkPSJNODEuMjg3LDM4MmMtMi42MzEsMC01LjIsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3czEuMDY5LDUuMjEsMi45Myw3LjA3DQoJYzEuODU5LDEuODYsNC40MzksMi45Myw3LjA3LDIuOTNjMi42NCwwLDUuMjItMS4wNyw3LjA3OS0yLjkzYzEuODYtMS44NiwyLjkzMS00LjQ0LDIuOTMxLTcuMDdzLTEuMDctNS4yMS0yLjkzMS03LjA3DQoJQzg2LjQ5NywzODMuMDcsODMuOTI3LDM4Miw4MS4yODcsMzgyeiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsMjcwaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwyNzAsMjY2LjAwNywyNzB6Ii8+DQo8cGF0aCBkPSJNNDkxLjAwMiwxMzAuMzJjLTkuNzE1LTUuNjA5LTIxLjAzMy03LjA5OS0zMS44NzEtNC4xOTZjLTEwLjgzNiwyLjkwNC0xOS44OTQsOS44NTQtMjUuNTAyLDE5LjU2OUwzMDcuNzg3LDM2My42NTYNCgljLTAuNjg5LDEuMTk1LTEuMTI1LDIuNTItMS4yNzgsMy44OTFsLTguODU4LDc5LjM0NGMtMC40NCwzLjk0OCwxLjQ5OCw3Ljc4Myw0LjkzOCw5Ljc3YzEuNTUzLDAuODk2LDMuMjc4LDEuMzQsNC45OTksMS4zNA0KCWMyLjA5MiwwLDQuMTc2LTAuNjU1LDUuOTMxLTEuOTQ4bDY0LjI4NC00Ny4zNDRjMS4xMTEtMC44MTgsMi4wNDEtMS44NTcsMi43My0zLjA1MmwxMjUuODQxLTIxNy45NjMNCglDNTE3Ljk1NCwxNjcuNjM4LDUxMS4wNTgsMTQxLjksNDkxLjAwMiwxMzAuMzJ6IE0zMjQuNjg5LDM4NC45NjJsMjguOTQyLDE2LjcxbC0zMy41NjgsMjQuNzIyTDMyNC42ODksMzg0Ljk2MnogTTM2OC4yMTMsMzg2Ljk5Ng0KCWwtMzguMTA1LTIybDEwMC45ODUtMTc0LjkxbDM4LjEwNSwyMkwzNjguMjEzLDM4Ni45OTZ6IE00ODkuMDU0LDE3Ny42OTNsLTkuODU3LDE3LjA3M2wtMzguMTA1LTIybDkuODU3LTE3LjA3Mw0KCWMyLjkzOC01LjA4OSw3LjY4Mi04LjcyOSwxMy4zNTgtMTAuMjVjNS42NzgtMS41MjIsMTEuNjA2LTAuNzQsMTYuNjk0LDIuMTk4YzUuMDg5LDIuOTM4LDguNzI5LDcuNjgyLDEwLjI1LDEzLjM1OA0KCUM0OTIuNzcyLDE2Ni42NzUsNDkxLjk5MiwxNzIuNjA0LDQ4OS4wNTQsMTc3LjY5M3oiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K'
                  );
                  introImg.setAttribute('style', 'width: 1.5em');
                  introImg.setAttribute(
                    'src',
                    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQzg3MDsiIGQ9Ik00NDMsNTAyLjA2M0gxNDljLTExLjA0NiwwLTIwLTguOTU0LTIwLTIwdi0zNzJjMC0xMS4wNDYsOC45NTQtMjAsMjAtMjBoMjk0DQoJYzExLjA0NiwwLDIwLDguOTU0LDIwLDIwdjM3MkM0NjMsNDkzLjEwOSw0NTQuMDQ2LDUwMi4wNjMsNDQzLDUwMi4wNjN6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZEQUEwOyIgZD0iTTQwMyw0NjIuMDYzSDEwOWMtMTEuMDQ2LDAtMjAtOC45NTQtMjAtMjB2LTM3MmMwLTExLjA0Niw4Ljk1NC0yMCwyMC0yMGgyOTQNCgljMTEuMDQ2LDAsMjAsOC45NTQsMjAsMjB2MzcyQzQyMyw0NTMuMTA5LDQxNC4wNDYsNDYyLjA2Myw0MDMsNDYyLjA2M3oiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzYyLjkzNyw0MjJoLTI5NGMtMTEuMDQ2LDAtMjAtOC45NTQtMjAtMjBWMzBjMC0xMS4wNDYsOC45NTQtMjAsMjAtMjBoMjk0YzExLjA0NiwwLDIwLDguOTU0LDIwLDIwDQoJdjM3MkMzODIuOTM3LDQxMy4wNDYsMzczLjk4Miw0MjIsMzYyLjkzNyw0MjJ6Ii8+DQo8cmVjdCB4PSIxMDQuOTQiIHk9Ijg0IiBzdHlsZT0iZmlsbDojQkFFRTgzOyIgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2Ii8+DQo8cGF0aCBkPSJNMzYyLjkzNyw0MzJoLTI5NGMtMTYuNTQyLDAtMzAtMTMuNDU4LTMwLTMwVjIxNi4zMzNjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMGM1LjUyMiwwLDEwLDQuNDc3LDEwLDEwVjQwMg0KCWMwLDUuNTE0LDQuNDg2LDEwLDEwLDEwaDI5NGM1LjUxNCwwLDEwLTQuNDg2LDEwLTEwVjMwYzAtNS41MTQtNC40ODYtMTAtMTAtMTBoLTI5NGMtNS41MTQsMC0xMCw0LjQ4Ni0xMCwxMHYxMDINCgljMCw1LjUyMy00LjQ3OCwxMC0xMCwxMGMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMFYzMGMwLTE2LjU0MiwxMy40NTgtMzAsMzAtMzBoMjk0YzE2LjU0MiwwLDMwLDEzLjQ1OCwzMCwzMHYzNzINCglDMzkyLjkzNyw0MTguNTQyLDM3OS40NzksNDMyLDM2Mi45MzcsNDMyeiIvPg0KPHBhdGggZD0iTTQ4LjkzNywxODYuNzhjLTIuNjMsMC01LjIxLTEuMDctNy4wNy0yLjkzYy0xLjg2LTEuODctMi45My00LjQ0LTIuOTMtNy4wOGMwLTIuNjIsMS4wNjktNS4yLDIuOTMtNy4wNw0KCWMxLjg2LTEuODYsNC40NC0yLjkyLDcuMDctMi45MmMyLjYzLDAsNS4yMSwxLjA2LDcuMDY5LDIuOTJjMS44NiwxLjg3LDIuOTMxLDQuNDQsMi45MzEsNy4wN2MwLDIuNjQtMS4wNyw1LjIyLTIuOTMxLDcuMDgNCglDNTQuMTQ2LDE4NS43MSw1MS41NjYsMTg2Ljc4LDQ4LjkzNywxODYuNzh6Ii8+DQo8cGF0aCBkPSJNODguOTk2LDQ3Mi4wNmMtMi42MywwLTUuMjEtMS4wNi03LjA2OS0yLjkzYy0xLjg2LTEuODYtMi45MzEtNC40My0yLjkzMS03LjA3YzAtMi42MywxLjA3LTUuMjEsMi45MzEtNy4wNw0KCWMxLjg1OS0xLjg2LDQuNDM5LTIuOTMsNy4wNjktMi45M2MyLjY0MSwwLDUuMjEsMS4wNyw3LjA3LDIuOTNzMi45Myw0LjQ0LDIuOTMsNy4wN2MwLDIuNjQtMS4wNjksNS4yMS0yLjkzLDcuMDcNCglDOTQuMjA2LDQ3MSw5MS42MzcsNDcyLjA2LDg4Ljk5Niw0NzIuMDZ6Ii8+DQo8cGF0aCBkPSJNNDAzLDQ3Mi4wNjNIMTI5Yy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDI3NGM1LjUxNCwwLDEwLTQuNDg2LDEwLTEwdi0zOTJjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMA0KCXMxMCw0LjQ3NywxMCwxMHYzOTJDNDMzLDQ1OC42MDUsNDE5LjU0Miw0NzIuMDYzLDQwMyw0NzIuMDYzeiIvPg0KPHBhdGggZD0iTTQ0My4wNjMsNTEyaC0zMTRjLTUuNTIyLDAtMTAtNC40NzctMTAtMTBzNC40NzgtMTAsMTAtMTBoMzE0YzUuNTE0LDAsMTAtNC40ODYsMTAtMTBWOTBjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMA0KCXMxMCw0LjQ3NywxMCwxMHYzOTJDNDczLjA2Myw0OTguNTQyLDQ1OS42MDUsNTEyLDQ0My4wNjMsNTEyeiIvPg0KPHBhdGggZD0iTTIwMC45MzcsMTkwaC05NmMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMFY4NGMwLTUuNTIzLDQuNDc4LTEwLDEwLTEwaDk2YzUuNTIyLDAsMTAsNC40NzcsMTAsMTB2OTYNCglDMjEwLjkzNywxODUuNTIzLDIwNi40NTksMTkwLDIwMC45MzcsMTkweiBNMTE0LjkzNywxNzBoNzZWOTRoLTc2VjE3MHoiLz4NCjxwYXRoIGQ9Ik0xMjguMDM1LDI4Ni4xMjdMMTI4LjAzNSwyODYuMTI3Yy0yLjY1MiwwLTUuMTk1LTEuMDU0LTcuMDcxLTIuOTI5bC0xOS40MzItMTkuNDMyYy0zLjkwNS0zLjkwNS0zLjkwNS0xMC4yMzcsMC0xNC4xNDINCgljMy45MDgtMy45MDQsMTAuMjM4LTMuOTA1LDE0LjE0MywwbDEyLjM2LDEyLjM2MWwyNi41ODMtMjYuNTgzYzMuOTA3LTMuOTA1LDEwLjIzNy0zLjkwNCwxNC4xNDMsMA0KCWMzLjkwNSwzLjkwNSwzLjkwNSwxMC4yMzcsMCwxNC4xNDJsLTMzLjY1NCwzMy42NTRDMTMzLjIzLDI4NS4wNzMsMTMwLjY4OCwyODYuMTI3LDEyOC4wMzUsMjg2LjEyN3oiLz4NCjxwYXRoIGQ9Ik0zMzIuNjA0LDI2OUgyMTUuOTM3Yy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDExNi42NjdjNS41MjIsMCwxMCw0LjQ3NywxMCwxMA0KCUMzNDIuNjA0LDI2NC41MjMsMzM4LjEyNiwyNjksMzMyLjYwNCwyNjl6Ii8+DQo8cGF0aCBkPSJNMzI2LjkzNyw5NGgtNzBjLTUuNTIyLDAtMTAtNC40NzctMTAtMTBzNC40NzgtMTAsMTAtMTBoNzBjNS41MjIsMCwxMCw0LjQ3NywxMCwxMFMzMzIuNDU5LDk0LDMyNi45MzcsOTR6Ii8+DQo8cGF0aCBkPSJNMzI2LjkzNywxNDJoLTcwYy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDcwYzUuNTIyLDAsMTAsNC40NzcsMTAsMTANCglDMzM2LjkzNywxMzcuNTIzLDMzMi40NTksMTQyLDMyNi45MzcsMTQyeiIvPg0KPHBhdGggZD0iTTMyNi45MzcsMTkwaC03MGMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3OC0xMCwxMC0xMGg3MGM1LjUyMiwwLDEwLDQuNDc3LDEwLDEwUzMzMi40NTksMTkwLDMyNi45MzcsMTkweiIvPg0KPHBhdGggZD0iTTEyOC4wMzUsMzYyLjQ5NEwxMjguMDM1LDM2Mi40OTRjLTIuNjUyLDAtNS4xOTUtMS4wNTQtNy4wNzEtMi45MjlsLTE5LjQzMi0xOS40MzJjLTMuOTA1LTMuOTA1LTMuOTA1LTEwLjIzNywwLTE0LjE0Mg0KCWMzLjkwOC0zLjkwNCwxMC4yMzgtMy45MDUsMTQuMTQzLDBsMTIuMzYsMTIuMzYxbDI2LjU4My0yNi41ODNjMy45MDctMy45MDUsMTAuMjM3LTMuOTA0LDE0LjE0MywwDQoJYzMuOTA1LDMuOTA1LDMuOTA1LDEwLjIzNywwLDE0LjE0MmwtMzMuNjU0LDMzLjY1NEMxMzMuMjMsMzYxLjQ0LDEzMC42ODgsMzYyLjQ5NCwxMjguMDM1LDM2Mi40OTR6Ii8+DQo8cGF0aCBkPSJNMzMyLjYwNCwzNDVIMjE1LjkzN2MtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3OC0xMCwxMC0xMGgxMTYuNjY3YzUuNTIyLDAsMTAsNC40NzcsMTAsMTBTMzM4LjEyNiwzNDUsMzMyLjYwNCwzNDV6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=='
                  );

                  nameTh.textContent = applys[j].user_name;
                  areaTh.textContent = applys[j].ap_area;
                  taskTh.textContent = applys[j].ap_task;
                  stateTh.textContent = applys[j].ap_pass;
                  apId.textContent = applys[j].ap_id;
                  listNum.textContent = dNum;

                  myTr.appendChild(checkTh);
                  myTr.appendChild(nameTh);
                  myTr.appendChild(cvTh);
                  myTr.appendChild(introTh);
                  myTr.appendChild(areaTh);
                  myTr.appendChild(taskTh);
                  myTr.appendChild(stateTh);
                  myTr.appendChild(apId);
                  myTr.appendChild(listNum);
                  checkTh.appendChild(checkBox);
                  cvTh.appendChild(cvLink);
                  cvLink.appendChild(cvImg);
                  introTh.appendChild(introLink);
                  introLink.appendChild(introImg);
                }
              }
            });
          }
        }

        function applyPass(jsonObj) {
          let applys = jsonObj['dtoList'];
          let userId;
          let introNum;
          for (let j = 0; j < applys.length; j++) {
            let myTr = document.createElement('tr');
            listSuccessfulApplicants.appendChild(myTr);

            let nameTh = document.createElement('td');
            let cvTh = document.createElement('td');
            let introTh = document.createElement('td');
            let areaTh = document.createElement('td');
            let taskTh = document.createElement('td');
            let checkBox = document.createElement('input');
            let cvLink = document.createElement('a');
            let introLink = document.createElement('a');
            let cvImg = document.createElement('img');
            let introImg = document.createElement('img');
            let apId = document.createElement('td');
            let listNum = document.createElement('td');
            userId = applys[j].user_id;
            introNum = applys[j].intro_num;
            listNum.setAttribute('class', 'listNum');
            cvLink.setAttribute('href', '/application/etp/cv/read?id=' + userId);
            cvLink.setAttribute('target', '_black');
            introLink.setAttribute('href', '/application/etp/introduce/read?num=' + introNum);
            introLink.setAttribute('target', '_black');
            cvImg.setAttribute('style', 'width: 1.5em');
            cvImg.setAttribute(
              'src',
              'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zOTQuMDA3LDUwMmgtMzY0Yy0xMS4wNDYsMC0yMC04Ljk1NC0yMC0yMFYzMGMwLTExLjA0Niw4Ljk1NC0yMCwyMC0yMGgzNjRjMTEuMDQ2LDAsMjAsOC45NTQsMjAsMjANCgl2NDUyQzQxNC4wMDcsNDkzLjA0Niw0MDUuMDUzLDUwMiwzOTQuMDA3LDUwMnoiLz4NCjxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZFNjY2MzsiIGN4PSIyMTIuMDEiIGN5PSIxNDYiIHI9IjgyIi8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZDREFDOyIgZD0iTTIzOC4wMDcsMTM1LjV2Ni41YzAsMTQuMzU5LTExLjY0MSwyNi0yNiwyNmwwLDBsMCwwYy0xNC4zNTksMC0yNi0xMS42NDEtMjYtMjZ2LTYuNQ0KCWMwLTE0LjM1OSwxMS42NDEtMjYsMjYtMjZsMCwwQzIyNi4zNjYsMTA5LjUsMjM4LjAwNywxMjEuMTQxLDIzOC4wMDcsMTM1LjV6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojQTVEREZGOyIgZD0iTTIxMi4wMDcsMTY4TDIxMi4wMDcsMTY4Yy0yNS4zOCwwLTQ3LjA2NCwxNS43NjctNTUuODMyLDM4LjAzMw0KCUMxNzAuODE1LDIxOS42NTUsMTkwLjQzMiwyMjgsMjEyLjAwNywyMjhzNDEuMTkyLTguMzQ1LDU1LjgzMi0yMS45NjdDMjU5LjA3MSwxODMuNzY3LDIzNy4zODcsMTY4LDIxMi4wMDcsMTY4eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQkM1MzsiIGQ9Ik00MzYuNTc0LDE2MC41OWw1LjcxNC05Ljg5N2M4LjgzNy0xNS4zMDUsMjguNDA3LTIwLjU0OSw0My43MTMtMTEuNzEzbDAsMA0KCWMxNS4zMDUsOC44MzcsMjAuNTQ5LDI4LjQwNywxMS43MTMsNDMuNzEzTDM3MS44NzMsNDAwLjY1NmwtNTUuNDI2LTMybDU0LjI4Mi05NC4wMkw0MzYuNTc0LDE2MC41OXoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRTY2NjM7IiBkPSJNNDg2LjAwMiwxMzguOThMNDg2LjAwMiwxMzguOThjLTE1LjMwNS04LjgzNy0zNC44NzYtMy41OTMtNDMuNzEzLDExLjcxM2wtMTQuODU3LDI1LjczM2w1NS40MjYsMzINCglsMTQuODU3LTI1LjczM0M1MDYuNTUxLDE2Ny4zODgsNTAxLjMwNywxNDcuODE3LDQ4Ni4wMDIsMTM4Ljk4eiIvPg0KPHBvbHlnb24gc3R5bGU9ImZpbGw6IzlBRDhGRjsiIHBvaW50cz0iMzcxLjg3Myw0MDAuNjU2IDMwNy41ODksNDQ4IDMxNi40NDcsMzY4LjY1NiAiLz4NCjxwYXRoIGQ9Ik00MTQuMDA3LDM5OC4zMjhjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBWNDgyYzAsNS41MTQtNC40ODYsMTAtMTAsMTBoLTM2NGMtNS41MTQsMC0xMC00LjQ4Ni0xMC0xMFYzMA0KCWMwLTUuNTE0LDQuNDg2LTEwLDEwLTEwaDM2NGM1LjUxNCwwLDEwLDQuNDg2LDEwLDEwdjEwOC43NWMwLDUuNTIzLDQuNDc4LDEwLDEwLDEwczEwLTQuNDc3LDEwLTEwVjMwYzAtMTYuNTQyLTEzLjQ1OC0zMC0zMC0zMA0KCWgtMzY0Yy0xNi41NDIsMC0zMCwxMy40NTgtMzAsMzB2NDUyYzAsMTYuNTQyLDEzLjQ1OCwzMCwzMCwzMGgzNjRjMTYuNTQyLDAsMzAtMTMuNDU4LDMwLTMwdi03My42NzINCglDNDI0LjAwNyw0MDIuODA1LDQxOS41MjksMzk4LjMyOCw0MTQuMDA3LDM5OC4zMjh6Ii8+DQo8cGF0aCBkPSJNMzA0LjAwNywxNDZjMC01MC43MjktNDEuMjcxLTkyLTkyLTkycy05Miw0MS4yNzEtOTIsOTJjMCwyNi4zMTcsMTEuMTEsNTAuMDg1LDI4Ljg4Miw2Ni44NjkNCgljMC4zMzMsMC4zNTYsMC42ODcsMC42OTMsMS4wNzQsMWMxNi4zNzEsMTQuOTc5LDM4LjE1OCwyNC4xMyw2Mi4wNDMsMjQuMTNzNDUuNjcyLTkuMTUyLDYyLjA0My0yNC4xMw0KCWMwLjM4Ny0wLjMwNywwLjc0MS0wLjY0NSwxLjA3NC0xQzI5Mi44OTcsMTk2LjA4NSwzMDQuMDA3LDE3Mi4zMTcsMzA0LjAwNywxNDZ6IE0yMTIuMDA3LDc0YzM5LjcwMSwwLDcyLDMyLjI5OSw3Miw3Mg0KCWMwLDE1Ljk2Ny01LjIzMSwzMC43My0xNC4wNiw0Mi42ODNjLTcuMzc1LTEwLjkzOC0xNy41OTYtMTkuNDQ1LTI5LjQ2My0yNC42OTdjNC43MS02LjA4Nyw3LjUyMy0xMy43MTIsNy41MjMtMjEuOTg2di02LjUNCgljMC0xOS44NTEtMTYuMTQ5LTM2LTM2LTM2cy0zNiwxNi4xNDktMzYsMzZ2Ni41YzAsOC4yNzQsMi44MTMsMTUuODk5LDcuNTIzLDIxLjk4NmMtMTEuODY3LDUuMjUyLTIyLjA4OCwxMy43NTktMjkuNDYzLDI0LjY5Nw0KCWMtOC44MjktMTEuOTUzLTE0LjA2LTI2LjcxNi0xNC4wNi00Mi42ODNDMTQwLjAwNywxMDYuMjk5LDE3Mi4zMDYsNzQsMjEyLjAwNyw3NHogTTE5Ni4wMDcsMTQydi02LjVjMC04LjgyMiw3LjE3OC0xNiwxNi0xNg0KCXMxNiw3LjE3OCwxNiwxNnY2LjVjMCw4LjgyMi03LjE3OCwxNi0xNiwxNlMxOTYuMDA3LDE1MC44MjIsMTk2LjAwNywxNDJ6IE0xNjguNTE2LDIwMy4zMzINCgljOC43ODktMTUuNTg1LDI1LjE5LTI1LjMzMiw0My40OTEtMjUuMzMyczM0LjcwMiw5Ljc0Nyw0My40OTEsMjUuMzMyQzI0My40MDUsMjEyLjUyOCwyMjguMzM2LDIxOCwyMTIuMDA3LDIxOA0KCVMxODAuNjA4LDIxMi41MjgsMTY4LjUxNiwyMDMuMzMyeiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsNDM4aC01NGMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGg1NGM1LjUyMiwwLDEwLTQuNDc3LDEwLTEwUzI3MS41MjksNDM4LDI2Ni4wMDcsNDM4eiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsMzgyaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwzODIsMjY2LjAwNywzODJ6Ii8+DQo8cGF0aCBkPSJNMjY2LjAwNywzMjZoLTE0MmMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGgxNDJjNS41MjIsMCwxMC00LjQ3NywxMC0xMFMyNzEuNTI5LDMyNiwyNjYuMDA3LDMyNnoiLz4NCjxwYXRoIGQ9Ik04OC4zNjYsMjcyLjkzYy0xLjg1OS0xLjg2LTQuNDM5LTIuOTMtNy4wNzktMi45M2MtMi42MzEsMC01LjIxMSwxLjA3LTcuMDcsMi45M2MtMS44NiwxLjg2LTIuOTMsNC40NC0yLjkzLDcuMDcNCglzMS4wNjksNS4yMSwyLjkzLDcuMDdjMS44NywxLjg2LDQuNDM5LDIuOTMsNy4wNywyLjkzYzIuNjQsMCw1LjIxLTEuMDcsNy4wNzktMi45M2MxLjg2LTEuODYsMi45MzEtNC40NCwyLjkzMS03LjA3DQoJUzkwLjIyNywyNzQuNzksODguMzY2LDI3Mi45M3oiLz4NCjxwYXRoIGQ9Ik04OC4zNjYsMzI4LjkzYy0xLjg2OS0xLjg2LTQuNDM5LTIuOTMtNy4wNzktMi45M2MtMi42MzEsMC01LjIsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3DQoJczEuMDY5LDUuMjEsMi45Myw3LjA3YzEuODcsMS44Niw0LjQzOSwyLjkzLDcuMDcsMi45M2MyLjY0LDAsNS4yMS0xLjA3LDcuMDc5LTIuOTNjMS44Ni0xLjg2LDIuOTMxLTQuNDQsMi45MzEtNy4wNw0KCVM5MC4yMjcsMzMwLjc5LDg4LjM2NiwzMjguOTN6Ii8+DQo8cGF0aCBkPSJNODEuMjg3LDM4MmMtMi42MzEsMC01LjIsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3czEuMDY5LDUuMjEsMi45Myw3LjA3DQoJYzEuODU5LDEuODYsNC40MzksMi45Myw3LjA3LDIuOTNjMi42NCwwLDUuMjItMS4wNyw3LjA3OS0yLjkzYzEuODYtMS44NiwyLjkzMS00LjQ0LDIuOTMxLTcuMDdzLTEuMDctNS4yMS0yLjkzMS03LjA3DQoJQzg2LjQ5NywzODMuMDcsODMuOTI3LDM4Miw4MS4yODcsMzgyeiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsMjcwaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwyNzAsMjY2LjAwNywyNzB6Ii8+DQo8cGF0aCBkPSJNNDkxLjAwMiwxMzAuMzJjLTkuNzE1LTUuNjA5LTIxLjAzMy03LjA5OS0zMS44NzEtNC4xOTZjLTEwLjgzNiwyLjkwNC0xOS44OTQsOS44NTQtMjUuNTAyLDE5LjU2OUwzMDcuNzg3LDM2My42NTYNCgljLTAuNjg5LDEuMTk1LTEuMTI1LDIuNTItMS4yNzgsMy44OTFsLTguODU4LDc5LjM0NGMtMC40NCwzLjk0OCwxLjQ5OCw3Ljc4Myw0LjkzOCw5Ljc3YzEuNTUzLDAuODk2LDMuMjc4LDEuMzQsNC45OTksMS4zNA0KCWMyLjA5MiwwLDQuMTc2LTAuNjU1LDUuOTMxLTEuOTQ4bDY0LjI4NC00Ny4zNDRjMS4xMTEtMC44MTgsMi4wNDEtMS44NTcsMi43My0zLjA1MmwxMjUuODQxLTIxNy45NjMNCglDNTE3Ljk1NCwxNjcuNjM4LDUxMS4wNTgsMTQxLjksNDkxLjAwMiwxMzAuMzJ6IE0zMjQuNjg5LDM4NC45NjJsMjguOTQyLDE2LjcxbC0zMy41NjgsMjQuNzIyTDMyNC42ODksMzg0Ljk2MnogTTM2OC4yMTMsMzg2Ljk5Ng0KCWwtMzguMTA1LTIybDEwMC45ODUtMTc0LjkxbDM4LjEwNSwyMkwzNjguMjEzLDM4Ni45OTZ6IE00ODkuMDU0LDE3Ny42OTNsLTkuODU3LDE3LjA3M2wtMzguMTA1LTIybDkuODU3LTE3LjA3Mw0KCWMyLjkzOC01LjA4OSw3LjY4Mi04LjcyOSwxMy4zNTgtMTAuMjVjNS42NzgtMS41MjIsMTEuNjA2LTAuNzQsMTYuNjk0LDIuMTk4YzUuMDg5LDIuOTM4LDguNzI5LDcuNjgyLDEwLjI1LDEzLjM1OA0KCUM0OTIuNzcyLDE2Ni42NzUsNDkxLjk5MiwxNzIuNjA0LDQ4OS4wNTQsMTc3LjY5M3oiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K'
            );
            introImg.setAttribute('style', 'width: 1.5em');
            introImg.setAttribute(
              'src',
              'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQzg3MDsiIGQ9Ik00NDMsNTAyLjA2M0gxNDljLTExLjA0NiwwLTIwLTguOTU0LTIwLTIwdi0zNzJjMC0xMS4wNDYsOC45NTQtMjAsMjAtMjBoMjk0DQoJYzExLjA0NiwwLDIwLDguOTU0LDIwLDIwdjM3MkM0NjMsNDkzLjEwOSw0NTQuMDQ2LDUwMi4wNjMsNDQzLDUwMi4wNjN6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZEQUEwOyIgZD0iTTQwMyw0NjIuMDYzSDEwOWMtMTEuMDQ2LDAtMjAtOC45NTQtMjAtMjB2LTM3MmMwLTExLjA0Niw4Ljk1NC0yMCwyMC0yMGgyOTQNCgljMTEuMDQ2LDAsMjAsOC45NTQsMjAsMjB2MzcyQzQyMyw0NTMuMTA5LDQxNC4wNDYsNDYyLjA2Myw0MDMsNDYyLjA2M3oiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzYyLjkzNyw0MjJoLTI5NGMtMTEuMDQ2LDAtMjAtOC45NTQtMjAtMjBWMzBjMC0xMS4wNDYsOC45NTQtMjAsMjAtMjBoMjk0YzExLjA0NiwwLDIwLDguOTU0LDIwLDIwDQoJdjM3MkMzODIuOTM3LDQxMy4wNDYsMzczLjk4Miw0MjIsMzYyLjkzNyw0MjJ6Ii8+DQo8cmVjdCB4PSIxMDQuOTQiIHk9Ijg0IiBzdHlsZT0iZmlsbDojQkFFRTgzOyIgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2Ii8+DQo8cGF0aCBkPSJNMzYyLjkzNyw0MzJoLTI5NGMtMTYuNTQyLDAtMzAtMTMuNDU4LTMwLTMwVjIxNi4zMzNjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMGM1LjUyMiwwLDEwLDQuNDc3LDEwLDEwVjQwMg0KCWMwLDUuNTE0LDQuNDg2LDEwLDEwLDEwaDI5NGM1LjUxNCwwLDEwLTQuNDg2LDEwLTEwVjMwYzAtNS41MTQtNC40ODYtMTAtMTAtMTBoLTI5NGMtNS41MTQsMC0xMCw0LjQ4Ni0xMCwxMHYxMDINCgljMCw1LjUyMy00LjQ3OCwxMC0xMCwxMGMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMFYzMGMwLTE2LjU0MiwxMy40NTgtMzAsMzAtMzBoMjk0YzE2LjU0MiwwLDMwLDEzLjQ1OCwzMCwzMHYzNzINCglDMzkyLjkzNyw0MTguNTQyLDM3OS40NzksNDMyLDM2Mi45MzcsNDMyeiIvPg0KPHBhdGggZD0iTTQ4LjkzNywxODYuNzhjLTIuNjMsMC01LjIxLTEuMDctNy4wNy0yLjkzYy0xLjg2LTEuODctMi45My00LjQ0LTIuOTMtNy4wOGMwLTIuNjIsMS4wNjktNS4yLDIuOTMtNy4wNw0KCWMxLjg2LTEuODYsNC40NC0yLjkyLDcuMDctMi45MmMyLjYzLDAsNS4yMSwxLjA2LDcuMDY5LDIuOTJjMS44NiwxLjg3LDIuOTMxLDQuNDQsMi45MzEsNy4wN2MwLDIuNjQtMS4wNyw1LjIyLTIuOTMxLDcuMDgNCglDNTQuMTQ2LDE4NS43MSw1MS41NjYsMTg2Ljc4LDQ4LjkzNywxODYuNzh6Ii8+DQo8cGF0aCBkPSJNODguOTk2LDQ3Mi4wNmMtMi42MywwLTUuMjEtMS4wNi03LjA2OS0yLjkzYy0xLjg2LTEuODYtMi45MzEtNC40My0yLjkzMS03LjA3YzAtMi42MywxLjA3LTUuMjEsMi45MzEtNy4wNw0KCWMxLjg1OS0xLjg2LDQuNDM5LTIuOTMsNy4wNjktMi45M2MyLjY0MSwwLDUuMjEsMS4wNyw3LjA3LDIuOTNzMi45Myw0LjQ0LDIuOTMsNy4wN2MwLDIuNjQtMS4wNjksNS4yMS0yLjkzLDcuMDcNCglDOTQuMjA2LDQ3MSw5MS42MzcsNDcyLjA2LDg4Ljk5Niw0NzIuMDZ6Ii8+DQo8cGF0aCBkPSJNNDAzLDQ3Mi4wNjNIMTI5Yy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDI3NGM1LjUxNCwwLDEwLTQuNDg2LDEwLTEwdi0zOTJjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMA0KCXMxMCw0LjQ3NywxMCwxMHYzOTJDNDMzLDQ1OC42MDUsNDE5LjU0Miw0NzIuMDYzLDQwMyw0NzIuMDYzeiIvPg0KPHBhdGggZD0iTTQ0My4wNjMsNTEyaC0zMTRjLTUuNTIyLDAtMTAtNC40NzctMTAtMTBzNC40NzgtMTAsMTAtMTBoMzE0YzUuNTE0LDAsMTAtNC40ODYsMTAtMTBWOTBjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMA0KCXMxMCw0LjQ3NywxMCwxMHYzOTJDNDczLjA2Myw0OTguNTQyLDQ1OS42MDUsNTEyLDQ0My4wNjMsNTEyeiIvPg0KPHBhdGggZD0iTTIwMC45MzcsMTkwaC05NmMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMFY4NGMwLTUuNTIzLDQuNDc4LTEwLDEwLTEwaDk2YzUuNTIyLDAsMTAsNC40NzcsMTAsMTB2OTYNCglDMjEwLjkzNywxODUuNTIzLDIwNi40NTksMTkwLDIwMC45MzcsMTkweiBNMTE0LjkzNywxNzBoNzZWOTRoLTc2VjE3MHoiLz4NCjxwYXRoIGQ9Ik0xMjguMDM1LDI4Ni4xMjdMMTI4LjAzNSwyODYuMTI3Yy0yLjY1MiwwLTUuMTk1LTEuMDU0LTcuMDcxLTIuOTI5bC0xOS40MzItMTkuNDMyYy0zLjkwNS0zLjkwNS0zLjkwNS0xMC4yMzcsMC0xNC4xNDINCgljMy45MDgtMy45MDQsMTAuMjM4LTMuOTA1LDE0LjE0MywwbDEyLjM2LDEyLjM2MWwyNi41ODMtMjYuNTgzYzMuOTA3LTMuOTA1LDEwLjIzNy0zLjkwNCwxNC4xNDMsMA0KCWMzLjkwNSwzLjkwNSwzLjkwNSwxMC4yMzcsMCwxNC4xNDJsLTMzLjY1NCwzMy42NTRDMTMzLjIzLDI4NS4wNzMsMTMwLjY4OCwyODYuMTI3LDEyOC4wMzUsMjg2LjEyN3oiLz4NCjxwYXRoIGQ9Ik0zMzIuNjA0LDI2OUgyMTUuOTM3Yy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDExNi42NjdjNS41MjIsMCwxMCw0LjQ3NywxMCwxMA0KCUMzNDIuNjA0LDI2NC41MjMsMzM4LjEyNiwyNjksMzMyLjYwNCwyNjl6Ii8+DQo8cGF0aCBkPSJNMzI2LjkzNyw5NGgtNzBjLTUuNTIyLDAtMTAtNC40NzctMTAtMTBzNC40NzgtMTAsMTAtMTBoNzBjNS41MjIsMCwxMCw0LjQ3NywxMCwxMFMzMzIuNDU5LDk0LDMyNi45MzcsOTR6Ii8+DQo8cGF0aCBkPSJNMzI2LjkzNywxNDJoLTcwYy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDcwYzUuNTIyLDAsMTAsNC40NzcsMTAsMTANCglDMzM2LjkzNywxMzcuNTIzLDMzMi40NTksMTQyLDMyNi45MzcsMTQyeiIvPg0KPHBhdGggZD0iTTMyNi45MzcsMTkwaC03MGMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3OC0xMCwxMC0xMGg3MGM1LjUyMiwwLDEwLDQuNDc3LDEwLDEwUzMzMi40NTksMTkwLDMyNi45MzcsMTkweiIvPg0KPHBhdGggZD0iTTEyOC4wMzUsMzYyLjQ5NEwxMjguMDM1LDM2Mi40OTRjLTIuNjUyLDAtNS4xOTUtMS4wNTQtNy4wNzEtMi45MjlsLTE5LjQzMi0xOS40MzJjLTMuOTA1LTMuOTA1LTMuOTA1LTEwLjIzNywwLTE0LjE0Mg0KCWMzLjkwOC0zLjkwNCwxMC4yMzgtMy45MDUsMTQuMTQzLDBsMTIuMzYsMTIuMzYxbDI2LjU4My0yNi41ODNjMy45MDctMy45MDUsMTAuMjM3LTMuOTA0LDE0LjE0MywwDQoJYzMuOTA1LDMuOTA1LDMuOTA1LDEwLjIzNywwLDE0LjE0MmwtMzMuNjU0LDMzLjY1NEMxMzMuMjMsMzYxLjQ0LDEzMC42ODgsMzYyLjQ5NCwxMjguMDM1LDM2Mi40OTR6Ii8+DQo8cGF0aCBkPSJNMzMyLjYwNCwzNDVIMjE1LjkzN2MtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3OC0xMCwxMC0xMGgxMTYuNjY3YzUuNTIyLDAsMTAsNC40NzcsMTAsMTBTMzM4LjEyNiwzNDUsMzMyLjYwNCwzNDV6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=='
            );
            apId.setAttribute('style', 'display:none;');
            listNum.setAttribute('style', 'display:none;');

            nameTh.textContent = applys[j].user_name;
            areaTh.textContent = applys[j].ap_area;
            taskTh.textContent = applys[j].ap_task;
            apId.textContent = applys[j].ap_id;
            listNum.textContent = dNum;

            myTr.appendChild(nameTh);
            myTr.appendChild(cvTh);
            myTr.appendChild(introTh);
            myTr.appendChild(areaTh);
            myTr.appendChild(taskTh);
            myTr.appendChild(apId);
            myTr.appendChild(listNum);
            cvTh.appendChild(cvLink);
            cvLink.appendChild(cvImg);
            introTh.appendChild(introLink);
            introLink.appendChild(introImg);
          }
          //페이지네이션
          let totalPage = jsonObj['totalPage'];
          let pageNumbers = document.querySelector('#passPageNumbers');
          let pageNumber;
          for (let p = 0; p < totalPage; p++) {
            let page = document.createElement('a');
            page.setAttribute('class', 'Passpage-link');
            page.textContent = p + 1;

            pageNumbers.appendChild(page);

            pageNumber = document.querySelectorAll('.Passpage-link');

            pageNumber[p].addEventListener('click', () => {
              $('#listSuccessfulApplicants').empty();
              $('.Passpage-link').removeClass('active');

              pageNumber[p].classList.add('active');

              requestPassURL = `/application/etp/employ/list/${dNum}?page=${p + 1}&pass=합격`;

              let requestPass = new XMLHttpRequest();
              requestPass.open('GET', requestPassURL);

              requestPass.responseType = 'json';
              requestPass.send();

              requestPass.onload = function () {
                let jsonObj = requestPass.response;
                applyPass2(jsonObj);
              };

              function applyPass2(jsonObj) {
                let applys = jsonObj['dtoList'];
                let userId;
                let introNum;
                for (let j = 0; j < applys.length; j++) {
                  let myTr = document.createElement('tr');
                  listSuccessfulApplicants.appendChild(myTr);

                  let nameTh = document.createElement('td');
                  let cvTh = document.createElement('td');
                  let introTh = document.createElement('td');
                  let areaTh = document.createElement('td');
                  let taskTh = document.createElement('td');
                  let cvLink = document.createElement('a');
                  let introLink = document.createElement('a');
                  let cvImg = document.createElement('img');
                  let introImg = document.createElement('img');
                  let apId = document.createElement('td');
                  let listNum = document.createElement('td');
                  userId = applys[j].user_id;
                  introNum = applys[j].intro_num;
                  listNum.setAttribute('class', 'listNum');
                  cvLink.setAttribute('href', '/application/etp/cv/read?id=' + userId);
                  cvLink.setAttribute('target', '_black');
                  introLink.setAttribute('href', '/application/etp/introduce/read?num=' + introNum);
                  introLink.setAttribute('target', '_black');
                  cvImg.setAttribute('style', 'width: 1.5em');
                  cvImg.setAttribute(
                    'src',
                    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zOTQuMDA3LDUwMmgtMzY0Yy0xMS4wNDYsMC0yMC04Ljk1NC0yMC0yMFYzMGMwLTExLjA0Niw4Ljk1NC0yMCwyMC0yMGgzNjRjMTEuMDQ2LDAsMjAsOC45NTQsMjAsMjANCgl2NDUyQzQxNC4wMDcsNDkzLjA0Niw0MDUuMDUzLDUwMiwzOTQuMDA3LDUwMnoiLz4NCjxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZFNjY2MzsiIGN4PSIyMTIuMDEiIGN5PSIxNDYiIHI9IjgyIi8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZDREFDOyIgZD0iTTIzOC4wMDcsMTM1LjV2Ni41YzAsMTQuMzU5LTExLjY0MSwyNi0yNiwyNmwwLDBsMCwwYy0xNC4zNTksMC0yNi0xMS42NDEtMjYtMjZ2LTYuNQ0KCWMwLTE0LjM1OSwxMS42NDEtMjYsMjYtMjZsMCwwQzIyNi4zNjYsMTA5LjUsMjM4LjAwNywxMjEuMTQxLDIzOC4wMDcsMTM1LjV6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojQTVEREZGOyIgZD0iTTIxMi4wMDcsMTY4TDIxMi4wMDcsMTY4Yy0yNS4zOCwwLTQ3LjA2NCwxNS43NjctNTUuODMyLDM4LjAzMw0KCUMxNzAuODE1LDIxOS42NTUsMTkwLjQzMiwyMjgsMjEyLjAwNywyMjhzNDEuMTkyLTguMzQ1LDU1LjgzMi0yMS45NjdDMjU5LjA3MSwxODMuNzY3LDIzNy4zODcsMTY4LDIxMi4wMDcsMTY4eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQkM1MzsiIGQ9Ik00MzYuNTc0LDE2MC41OWw1LjcxNC05Ljg5N2M4LjgzNy0xNS4zMDUsMjguNDA3LTIwLjU0OSw0My43MTMtMTEuNzEzbDAsMA0KCWMxNS4zMDUsOC44MzcsMjAuNTQ5LDI4LjQwNywxMS43MTMsNDMuNzEzTDM3MS44NzMsNDAwLjY1NmwtNTUuNDI2LTMybDU0LjI4Mi05NC4wMkw0MzYuNTc0LDE2MC41OXoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRTY2NjM7IiBkPSJNNDg2LjAwMiwxMzguOThMNDg2LjAwMiwxMzguOThjLTE1LjMwNS04LjgzNy0zNC44NzYtMy41OTMtNDMuNzEzLDExLjcxM2wtMTQuODU3LDI1LjczM2w1NS40MjYsMzINCglsMTQuODU3LTI1LjczM0M1MDYuNTUxLDE2Ny4zODgsNTAxLjMwNywxNDcuODE3LDQ4Ni4wMDIsMTM4Ljk4eiIvPg0KPHBvbHlnb24gc3R5bGU9ImZpbGw6IzlBRDhGRjsiIHBvaW50cz0iMzcxLjg3Myw0MDAuNjU2IDMwNy41ODksNDQ4IDMxNi40NDcsMzY4LjY1NiAiLz4NCjxwYXRoIGQ9Ik00MTQuMDA3LDM5OC4zMjhjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBWNDgyYzAsNS41MTQtNC40ODYsMTAtMTAsMTBoLTM2NGMtNS41MTQsMC0xMC00LjQ4Ni0xMC0xMFYzMA0KCWMwLTUuNTE0LDQuNDg2LTEwLDEwLTEwaDM2NGM1LjUxNCwwLDEwLDQuNDg2LDEwLDEwdjEwOC43NWMwLDUuNTIzLDQuNDc4LDEwLDEwLDEwczEwLTQuNDc3LDEwLTEwVjMwYzAtMTYuNTQyLTEzLjQ1OC0zMC0zMC0zMA0KCWgtMzY0Yy0xNi41NDIsMC0zMCwxMy40NTgtMzAsMzB2NDUyYzAsMTYuNTQyLDEzLjQ1OCwzMCwzMCwzMGgzNjRjMTYuNTQyLDAsMzAtMTMuNDU4LDMwLTMwdi03My42NzINCglDNDI0LjAwNyw0MDIuODA1LDQxOS41MjksMzk4LjMyOCw0MTQuMDA3LDM5OC4zMjh6Ii8+DQo8cGF0aCBkPSJNMzA0LjAwNywxNDZjMC01MC43MjktNDEuMjcxLTkyLTkyLTkycy05Miw0MS4yNzEtOTIsOTJjMCwyNi4zMTcsMTEuMTEsNTAuMDg1LDI4Ljg4Miw2Ni44NjkNCgljMC4zMzMsMC4zNTYsMC42ODcsMC42OTMsMS4wNzQsMWMxNi4zNzEsMTQuOTc5LDM4LjE1OCwyNC4xMyw2Mi4wNDMsMjQuMTNzNDUuNjcyLTkuMTUyLDYyLjA0My0yNC4xMw0KCWMwLjM4Ny0wLjMwNywwLjc0MS0wLjY0NSwxLjA3NC0xQzI5Mi44OTcsMTk2LjA4NSwzMDQuMDA3LDE3Mi4zMTcsMzA0LjAwNywxNDZ6IE0yMTIuMDA3LDc0YzM5LjcwMSwwLDcyLDMyLjI5OSw3Miw3Mg0KCWMwLDE1Ljk2Ny01LjIzMSwzMC43My0xNC4wNiw0Mi42ODNjLTcuMzc1LTEwLjkzOC0xNy41OTYtMTkuNDQ1LTI5LjQ2My0yNC42OTdjNC43MS02LjA4Nyw3LjUyMy0xMy43MTIsNy41MjMtMjEuOTg2di02LjUNCgljMC0xOS44NTEtMTYuMTQ5LTM2LTM2LTM2cy0zNiwxNi4xNDktMzYsMzZ2Ni41YzAsOC4yNzQsMi44MTMsMTUuODk5LDcuNTIzLDIxLjk4NmMtMTEuODY3LDUuMjUyLTIyLjA4OCwxMy43NTktMjkuNDYzLDI0LjY5Nw0KCWMtOC44MjktMTEuOTUzLTE0LjA2LTI2LjcxNi0xNC4wNi00Mi42ODNDMTQwLjAwNywxMDYuMjk5LDE3Mi4zMDYsNzQsMjEyLjAwNyw3NHogTTE5Ni4wMDcsMTQydi02LjVjMC04LjgyMiw3LjE3OC0xNiwxNi0xNg0KCXMxNiw3LjE3OCwxNiwxNnY2LjVjMCw4LjgyMi03LjE3OCwxNi0xNiwxNlMxOTYuMDA3LDE1MC44MjIsMTk2LjAwNywxNDJ6IE0xNjguNTE2LDIwMy4zMzINCgljOC43ODktMTUuNTg1LDI1LjE5LTI1LjMzMiw0My40OTEtMjUuMzMyczM0LjcwMiw5Ljc0Nyw0My40OTEsMjUuMzMyQzI0My40MDUsMjEyLjUyOCwyMjguMzM2LDIxOCwyMTIuMDA3LDIxOA0KCVMxODAuNjA4LDIxMi41MjgsMTY4LjUxNiwyMDMuMzMyeiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsNDM4aC01NGMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGg1NGM1LjUyMiwwLDEwLTQuNDc3LDEwLTEwUzI3MS41MjksNDM4LDI2Ni4wMDcsNDM4eiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsMzgyaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwzODIsMjY2LjAwNywzODJ6Ii8+DQo8cGF0aCBkPSJNMjY2LjAwNywzMjZoLTE0MmMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGgxNDJjNS41MjIsMCwxMC00LjQ3NywxMC0xMFMyNzEuNTI5LDMyNiwyNjYuMDA3LDMyNnoiLz4NCjxwYXRoIGQ9Ik04OC4zNjYsMjcyLjkzYy0xLjg1OS0xLjg2LTQuNDM5LTIuOTMtNy4wNzktMi45M2MtMi42MzEsMC01LjIxMSwxLjA3LTcuMDcsMi45M2MtMS44NiwxLjg2LTIuOTMsNC40NC0yLjkzLDcuMDcNCglzMS4wNjksNS4yMSwyLjkzLDcuMDdjMS44NywxLjg2LDQuNDM5LDIuOTMsNy4wNywyLjkzYzIuNjQsMCw1LjIxLTEuMDcsNy4wNzktMi45M2MxLjg2LTEuODYsMi45MzEtNC40NCwyLjkzMS03LjA3DQoJUzkwLjIyNywyNzQuNzksODguMzY2LDI3Mi45M3oiLz4NCjxwYXRoIGQ9Ik04OC4zNjYsMzI4LjkzYy0xLjg2OS0xLjg2LTQuNDM5LTIuOTMtNy4wNzktMi45M2MtMi42MzEsMC01LjIsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3DQoJczEuMDY5LDUuMjEsMi45Myw3LjA3YzEuODcsMS44Niw0LjQzOSwyLjkzLDcuMDcsMi45M2MyLjY0LDAsNS4yMS0xLjA3LDcuMDc5LTIuOTNjMS44Ni0xLjg2LDIuOTMxLTQuNDQsMi45MzEtNy4wNw0KCVM5MC4yMjcsMzMwLjc5LDg4LjM2NiwzMjguOTN6Ii8+DQo8cGF0aCBkPSJNODEuMjg3LDM4MmMtMi42MzEsMC01LjIsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3czEuMDY5LDUuMjEsMi45Myw3LjA3DQoJYzEuODU5LDEuODYsNC40MzksMi45Myw3LjA3LDIuOTNjMi42NCwwLDUuMjItMS4wNyw3LjA3OS0yLjkzYzEuODYtMS44NiwyLjkzMS00LjQ0LDIuOTMxLTcuMDdzLTEuMDctNS4yMS0yLjkzMS03LjA3DQoJQzg2LjQ5NywzODMuMDcsODMuOTI3LDM4Miw4MS4yODcsMzgyeiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsMjcwaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwyNzAsMjY2LjAwNywyNzB6Ii8+DQo8cGF0aCBkPSJNNDkxLjAwMiwxMzAuMzJjLTkuNzE1LTUuNjA5LTIxLjAzMy03LjA5OS0zMS44NzEtNC4xOTZjLTEwLjgzNiwyLjkwNC0xOS44OTQsOS44NTQtMjUuNTAyLDE5LjU2OUwzMDcuNzg3LDM2My42NTYNCgljLTAuNjg5LDEuMTk1LTEuMTI1LDIuNTItMS4yNzgsMy44OTFsLTguODU4LDc5LjM0NGMtMC40NCwzLjk0OCwxLjQ5OCw3Ljc4Myw0LjkzOCw5Ljc3YzEuNTUzLDAuODk2LDMuMjc4LDEuMzQsNC45OTksMS4zNA0KCWMyLjA5MiwwLDQuMTc2LTAuNjU1LDUuOTMxLTEuOTQ4bDY0LjI4NC00Ny4zNDRjMS4xMTEtMC44MTgsMi4wNDEtMS44NTcsMi43My0zLjA1MmwxMjUuODQxLTIxNy45NjMNCglDNTE3Ljk1NCwxNjcuNjM4LDUxMS4wNTgsMTQxLjksNDkxLjAwMiwxMzAuMzJ6IE0zMjQuNjg5LDM4NC45NjJsMjguOTQyLDE2LjcxbC0zMy41NjgsMjQuNzIyTDMyNC42ODksMzg0Ljk2MnogTTM2OC4yMTMsMzg2Ljk5Ng0KCWwtMzguMTA1LTIybDEwMC45ODUtMTc0LjkxbDM4LjEwNSwyMkwzNjguMjEzLDM4Ni45OTZ6IE00ODkuMDU0LDE3Ny42OTNsLTkuODU3LDE3LjA3M2wtMzguMTA1LTIybDkuODU3LTE3LjA3Mw0KCWMyLjkzOC01LjA4OSw3LjY4Mi04LjcyOSwxMy4zNTgtMTAuMjVjNS42NzgtMS41MjIsMTEuNjA2LTAuNzQsMTYuNjk0LDIuMTk4YzUuMDg5LDIuOTM4LDguNzI5LDcuNjgyLDEwLjI1LDEzLjM1OA0KCUM0OTIuNzcyLDE2Ni42NzUsNDkxLjk5MiwxNzIuNjA0LDQ4OS4wNTQsMTc3LjY5M3oiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K'
                  );
                  introImg.setAttribute('style', 'width: 1.5em');
                  introImg.setAttribute(
                    'src',
                    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQzg3MDsiIGQ9Ik00NDMsNTAyLjA2M0gxNDljLTExLjA0NiwwLTIwLTguOTU0LTIwLTIwdi0zNzJjMC0xMS4wNDYsOC45NTQtMjAsMjAtMjBoMjk0DQoJYzExLjA0NiwwLDIwLDguOTU0LDIwLDIwdjM3MkM0NjMsNDkzLjEwOSw0NTQuMDQ2LDUwMi4wNjMsNDQzLDUwMi4wNjN6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZEQUEwOyIgZD0iTTQwMyw0NjIuMDYzSDEwOWMtMTEuMDQ2LDAtMjAtOC45NTQtMjAtMjB2LTM3MmMwLTExLjA0Niw4Ljk1NC0yMCwyMC0yMGgyOTQNCgljMTEuMDQ2LDAsMjAsOC45NTQsMjAsMjB2MzcyQzQyMyw0NTMuMTA5LDQxNC4wNDYsNDYyLjA2Myw0MDMsNDYyLjA2M3oiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzYyLjkzNyw0MjJoLTI5NGMtMTEuMDQ2LDAtMjAtOC45NTQtMjAtMjBWMzBjMC0xMS4wNDYsOC45NTQtMjAsMjAtMjBoMjk0YzExLjA0NiwwLDIwLDguOTU0LDIwLDIwDQoJdjM3MkMzODIuOTM3LDQxMy4wNDYsMzczLjk4Miw0MjIsMzYyLjkzNyw0MjJ6Ii8+DQo8cmVjdCB4PSIxMDQuOTQiIHk9Ijg0IiBzdHlsZT0iZmlsbDojQkFFRTgzOyIgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2Ii8+DQo8cGF0aCBkPSJNMzYyLjkzNyw0MzJoLTI5NGMtMTYuNTQyLDAtMzAtMTMuNDU4LTMwLTMwVjIxNi4zMzNjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMGM1LjUyMiwwLDEwLDQuNDc3LDEwLDEwVjQwMg0KCWMwLDUuNTE0LDQuNDg2LDEwLDEwLDEwaDI5NGM1LjUxNCwwLDEwLTQuNDg2LDEwLTEwVjMwYzAtNS41MTQtNC40ODYtMTAtMTAtMTBoLTI5NGMtNS41MTQsMC0xMCw0LjQ4Ni0xMCwxMHYxMDINCgljMCw1LjUyMy00LjQ3OCwxMC0xMCwxMGMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMFYzMGMwLTE2LjU0MiwxMy40NTgtMzAsMzAtMzBoMjk0YzE2LjU0MiwwLDMwLDEzLjQ1OCwzMCwzMHYzNzINCglDMzkyLjkzNyw0MTguNTQyLDM3OS40NzksNDMyLDM2Mi45MzcsNDMyeiIvPg0KPHBhdGggZD0iTTQ4LjkzNywxODYuNzhjLTIuNjMsMC01LjIxLTEuMDctNy4wNy0yLjkzYy0xLjg2LTEuODctMi45My00LjQ0LTIuOTMtNy4wOGMwLTIuNjIsMS4wNjktNS4yLDIuOTMtNy4wNw0KCWMxLjg2LTEuODYsNC40NC0yLjkyLDcuMDctMi45MmMyLjYzLDAsNS4yMSwxLjA2LDcuMDY5LDIuOTJjMS44NiwxLjg3LDIuOTMxLDQuNDQsMi45MzEsNy4wN2MwLDIuNjQtMS4wNyw1LjIyLTIuOTMxLDcuMDgNCglDNTQuMTQ2LDE4NS43MSw1MS41NjYsMTg2Ljc4LDQ4LjkzNywxODYuNzh6Ii8+DQo8cGF0aCBkPSJNODguOTk2LDQ3Mi4wNmMtMi42MywwLTUuMjEtMS4wNi03LjA2OS0yLjkzYy0xLjg2LTEuODYtMi45MzEtNC40My0yLjkzMS03LjA3YzAtMi42MywxLjA3LTUuMjEsMi45MzEtNy4wNw0KCWMxLjg1OS0xLjg2LDQuNDM5LTIuOTMsNy4wNjktMi45M2MyLjY0MSwwLDUuMjEsMS4wNyw3LjA3LDIuOTNzMi45Myw0LjQ0LDIuOTMsNy4wN2MwLDIuNjQtMS4wNjksNS4yMS0yLjkzLDcuMDcNCglDOTQuMjA2LDQ3MSw5MS42MzcsNDcyLjA2LDg4Ljk5Niw0NzIuMDZ6Ii8+DQo8cGF0aCBkPSJNNDAzLDQ3Mi4wNjNIMTI5Yy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDI3NGM1LjUxNCwwLDEwLTQuNDg2LDEwLTEwdi0zOTJjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMA0KCXMxMCw0LjQ3NywxMCwxMHYzOTJDNDMzLDQ1OC42MDUsNDE5LjU0Miw0NzIuMDYzLDQwMyw0NzIuMDYzeiIvPg0KPHBhdGggZD0iTTQ0My4wNjMsNTEyaC0zMTRjLTUuNTIyLDAtMTAtNC40NzctMTAtMTBzNC40NzgtMTAsMTAtMTBoMzE0YzUuNTE0LDAsMTAtNC40ODYsMTAtMTBWOTBjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMA0KCXMxMCw0LjQ3NywxMCwxMHYzOTJDNDczLjA2Myw0OTguNTQyLDQ1OS42MDUsNTEyLDQ0My4wNjMsNTEyeiIvPg0KPHBhdGggZD0iTTIwMC45MzcsMTkwaC05NmMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMFY4NGMwLTUuNTIzLDQuNDc4LTEwLDEwLTEwaDk2YzUuNTIyLDAsMTAsNC40NzcsMTAsMTB2OTYNCglDMjEwLjkzNywxODUuNTIzLDIwNi40NTksMTkwLDIwMC45MzcsMTkweiBNMTE0LjkzNywxNzBoNzZWOTRoLTc2VjE3MHoiLz4NCjxwYXRoIGQ9Ik0xMjguMDM1LDI4Ni4xMjdMMTI4LjAzNSwyODYuMTI3Yy0yLjY1MiwwLTUuMTk1LTEuMDU0LTcuMDcxLTIuOTI5bC0xOS40MzItMTkuNDMyYy0zLjkwNS0zLjkwNS0zLjkwNS0xMC4yMzcsMC0xNC4xNDINCgljMy45MDgtMy45MDQsMTAuMjM4LTMuOTA1LDE0LjE0MywwbDEyLjM2LDEyLjM2MWwyNi41ODMtMjYuNTgzYzMuOTA3LTMuOTA1LDEwLjIzNy0zLjkwNCwxNC4xNDMsMA0KCWMzLjkwNSwzLjkwNSwzLjkwNSwxMC4yMzcsMCwxNC4xNDJsLTMzLjY1NCwzMy42NTRDMTMzLjIzLDI4NS4wNzMsMTMwLjY4OCwyODYuMTI3LDEyOC4wMzUsMjg2LjEyN3oiLz4NCjxwYXRoIGQ9Ik0zMzIuNjA0LDI2OUgyMTUuOTM3Yy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDExNi42NjdjNS41MjIsMCwxMCw0LjQ3NywxMCwxMA0KCUMzNDIuNjA0LDI2NC41MjMsMzM4LjEyNiwyNjksMzMyLjYwNCwyNjl6Ii8+DQo8cGF0aCBkPSJNMzI2LjkzNyw5NGgtNzBjLTUuNTIyLDAtMTAtNC40NzctMTAtMTBzNC40NzgtMTAsMTAtMTBoNzBjNS41MjIsMCwxMCw0LjQ3NywxMCwxMFMzMzIuNDU5LDk0LDMyNi45MzcsOTR6Ii8+DQo8cGF0aCBkPSJNMzI2LjkzNywxNDJoLTcwYy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDcwYzUuNTIyLDAsMTAsNC40NzcsMTAsMTANCglDMzM2LjkzNywxMzcuNTIzLDMzMi40NTksMTQyLDMyNi45MzcsMTQyeiIvPg0KPHBhdGggZD0iTTMyNi45MzcsMTkwaC03MGMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3OC0xMCwxMC0xMGg3MGM1LjUyMiwwLDEwLDQuNDc3LDEwLDEwUzMzMi40NTksMTkwLDMyNi45MzcsMTkweiIvPg0KPHBhdGggZD0iTTEyOC4wMzUsMzYyLjQ5NEwxMjguMDM1LDM2Mi40OTRjLTIuNjUyLDAtNS4xOTUtMS4wNTQtNy4wNzEtMi45MjlsLTE5LjQzMi0xOS40MzJjLTMuOTA1LTMuOTA1LTMuOTA1LTEwLjIzNywwLTE0LjE0Mg0KCWMzLjkwOC0zLjkwNCwxMC4yMzgtMy45MDUsMTQuMTQzLDBsMTIuMzYsMTIuMzYxbDI2LjU4My0yNi41ODNjMy45MDctMy45MDUsMTAuMjM3LTMuOTA0LDE0LjE0MywwDQoJYzMuOTA1LDMuOTA1LDMuOTA1LDEwLjIzNywwLDE0LjE0MmwtMzMuNjU0LDMzLjY1NEMxMzMuMjMsMzYxLjQ0LDEzMC42ODgsMzYyLjQ5NCwxMjguMDM1LDM2Mi40OTR6Ii8+DQo8cGF0aCBkPSJNMzMyLjYwNCwzNDVIMjE1LjkzN2MtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3OC0xMCwxMC0xMGgxMTYuNjY3YzUuNTIyLDAsMTAsNC40NzcsMTAsMTBTMzM4LjEyNiwzNDUsMzMyLjYwNCwzNDV6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=='
                  );
                  apId.setAttribute('style', 'display:none;');
                  listNum.setAttribute('style', 'display:none;');

                  nameTh.textContent = applys[j].user_name;
                  areaTh.textContent = applys[j].ap_area;
                  taskTh.textContent = applys[j].ap_task;
                  apId.textContent = applys[j].ap_id;
                  listNum.textContent = dNum;

                  myTr.appendChild(nameTh);
                  myTr.appendChild(cvTh);
                  myTr.appendChild(introTh);
                  myTr.appendChild(areaTh);
                  myTr.appendChild(taskTh);
                  myTr.appendChild(apId);
                  myTr.appendChild(listNum);
                  cvTh.appendChild(cvLink);
                  cvLink.appendChild(cvImg);
                  introTh.appendChild(introLink);
                  introLink.appendChild(introImg);
                }
              }
            });
          }
        }

        function applyFail(jsonObj) {
          let applys = jsonObj['dtoList'];
          let userId;
          let introNum;
          for (let j = 0; j < applys.length; j++) {
            let myTr = document.createElement('tr');
            listRejectedCandidates.appendChild(myTr);

            let nameTh = document.createElement('td');
            let cvTh = document.createElement('td');
            let introTh = document.createElement('td');
            let areaTh = document.createElement('td');
            let taskTh = document.createElement('td');
            let cvLink = document.createElement('a');
            let introLink = document.createElement('a');
            let cvImg = document.createElement('img');
            let introImg = document.createElement('img');
            let apId = document.createElement('td');
            let listNum = document.createElement('td');
            userId = applys[j].user_id;
            introNum = applys[j].intro_num;
            listNum.setAttribute('class', 'listNum');
            cvLink.setAttribute('href', '/application/etp/cv/read?id=' + userId);
            cvLink.setAttribute('target', '_black');
            introLink.setAttribute('href', '/application/etp/introduce/read?num=' + introNum);
            introLink.setAttribute('target', '_black');
            cvImg.setAttribute('style', 'width: 1.5em');
            cvImg.setAttribute(
              'src',
              'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zOTQuMDA3LDUwMmgtMzY0Yy0xMS4wNDYsMC0yMC04Ljk1NC0yMC0yMFYzMGMwLTExLjA0Niw4Ljk1NC0yMCwyMC0yMGgzNjRjMTEuMDQ2LDAsMjAsOC45NTQsMjAsMjANCgl2NDUyQzQxNC4wMDcsNDkzLjA0Niw0MDUuMDUzLDUwMiwzOTQuMDA3LDUwMnoiLz4NCjxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZFNjY2MzsiIGN4PSIyMTIuMDEiIGN5PSIxNDYiIHI9IjgyIi8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZDREFDOyIgZD0iTTIzOC4wMDcsMTM1LjV2Ni41YzAsMTQuMzU5LTExLjY0MSwyNi0yNiwyNmwwLDBsMCwwYy0xNC4zNTksMC0yNi0xMS42NDEtMjYtMjZ2LTYuNQ0KCWMwLTE0LjM1OSwxMS42NDEtMjYsMjYtMjZsMCwwQzIyNi4zNjYsMTA5LjUsMjM4LjAwNywxMjEuMTQxLDIzOC4wMDcsMTM1LjV6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojQTVEREZGOyIgZD0iTTIxMi4wMDcsMTY4TDIxMi4wMDcsMTY4Yy0yNS4zOCwwLTQ3LjA2NCwxNS43NjctNTUuODMyLDM4LjAzMw0KCUMxNzAuODE1LDIxOS42NTUsMTkwLjQzMiwyMjgsMjEyLjAwNywyMjhzNDEuMTkyLTguMzQ1LDU1LjgzMi0yMS45NjdDMjU5LjA3MSwxODMuNzY3LDIzNy4zODcsMTY4LDIxMi4wMDcsMTY4eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQkM1MzsiIGQ9Ik00MzYuNTc0LDE2MC41OWw1LjcxNC05Ljg5N2M4LjgzNy0xNS4zMDUsMjguNDA3LTIwLjU0OSw0My43MTMtMTEuNzEzbDAsMA0KCWMxNS4zMDUsOC44MzcsMjAuNTQ5LDI4LjQwNywxMS43MTMsNDMuNzEzTDM3MS44NzMsNDAwLjY1NmwtNTUuNDI2LTMybDU0LjI4Mi05NC4wMkw0MzYuNTc0LDE2MC41OXoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRTY2NjM7IiBkPSJNNDg2LjAwMiwxMzguOThMNDg2LjAwMiwxMzguOThjLTE1LjMwNS04LjgzNy0zNC44NzYtMy41OTMtNDMuNzEzLDExLjcxM2wtMTQuODU3LDI1LjczM2w1NS40MjYsMzINCglsMTQuODU3LTI1LjczM0M1MDYuNTUxLDE2Ny4zODgsNTAxLjMwNywxNDcuODE3LDQ4Ni4wMDIsMTM4Ljk4eiIvPg0KPHBvbHlnb24gc3R5bGU9ImZpbGw6IzlBRDhGRjsiIHBvaW50cz0iMzcxLjg3Myw0MDAuNjU2IDMwNy41ODksNDQ4IDMxNi40NDcsMzY4LjY1NiAiLz4NCjxwYXRoIGQ9Ik00MTQuMDA3LDM5OC4zMjhjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBWNDgyYzAsNS41MTQtNC40ODYsMTAtMTAsMTBoLTM2NGMtNS41MTQsMC0xMC00LjQ4Ni0xMC0xMFYzMA0KCWMwLTUuNTE0LDQuNDg2LTEwLDEwLTEwaDM2NGM1LjUxNCwwLDEwLDQuNDg2LDEwLDEwdjEwOC43NWMwLDUuNTIzLDQuNDc4LDEwLDEwLDEwczEwLTQuNDc3LDEwLTEwVjMwYzAtMTYuNTQyLTEzLjQ1OC0zMC0zMC0zMA0KCWgtMzY0Yy0xNi41NDIsMC0zMCwxMy40NTgtMzAsMzB2NDUyYzAsMTYuNTQyLDEzLjQ1OCwzMCwzMCwzMGgzNjRjMTYuNTQyLDAsMzAtMTMuNDU4LDMwLTMwdi03My42NzINCglDNDI0LjAwNyw0MDIuODA1LDQxOS41MjksMzk4LjMyOCw0MTQuMDA3LDM5OC4zMjh6Ii8+DQo8cGF0aCBkPSJNMzA0LjAwNywxNDZjMC01MC43MjktNDEuMjcxLTkyLTkyLTkycy05Miw0MS4yNzEtOTIsOTJjMCwyNi4zMTcsMTEuMTEsNTAuMDg1LDI4Ljg4Miw2Ni44NjkNCgljMC4zMzMsMC4zNTYsMC42ODcsMC42OTMsMS4wNzQsMWMxNi4zNzEsMTQuOTc5LDM4LjE1OCwyNC4xMyw2Mi4wNDMsMjQuMTNzNDUuNjcyLTkuMTUyLDYyLjA0My0yNC4xMw0KCWMwLjM4Ny0wLjMwNywwLjc0MS0wLjY0NSwxLjA3NC0xQzI5Mi44OTcsMTk2LjA4NSwzMDQuMDA3LDE3Mi4zMTcsMzA0LjAwNywxNDZ6IE0yMTIuMDA3LDc0YzM5LjcwMSwwLDcyLDMyLjI5OSw3Miw3Mg0KCWMwLDE1Ljk2Ny01LjIzMSwzMC43My0xNC4wNiw0Mi42ODNjLTcuMzc1LTEwLjkzOC0xNy41OTYtMTkuNDQ1LTI5LjQ2My0yNC42OTdjNC43MS02LjA4Nyw3LjUyMy0xMy43MTIsNy41MjMtMjEuOTg2di02LjUNCgljMC0xOS44NTEtMTYuMTQ5LTM2LTM2LTM2cy0zNiwxNi4xNDktMzYsMzZ2Ni41YzAsOC4yNzQsMi44MTMsMTUuODk5LDcuNTIzLDIxLjk4NmMtMTEuODY3LDUuMjUyLTIyLjA4OCwxMy43NTktMjkuNDYzLDI0LjY5Nw0KCWMtOC44MjktMTEuOTUzLTE0LjA2LTI2LjcxNi0xNC4wNi00Mi42ODNDMTQwLjAwNywxMDYuMjk5LDE3Mi4zMDYsNzQsMjEyLjAwNyw3NHogTTE5Ni4wMDcsMTQydi02LjVjMC04LjgyMiw3LjE3OC0xNiwxNi0xNg0KCXMxNiw3LjE3OCwxNiwxNnY2LjVjMCw4LjgyMi03LjE3OCwxNi0xNiwxNlMxOTYuMDA3LDE1MC44MjIsMTk2LjAwNywxNDJ6IE0xNjguNTE2LDIwMy4zMzINCgljOC43ODktMTUuNTg1LDI1LjE5LTI1LjMzMiw0My40OTEtMjUuMzMyczM0LjcwMiw5Ljc0Nyw0My40OTEsMjUuMzMyQzI0My40MDUsMjEyLjUyOCwyMjguMzM2LDIxOCwyMTIuMDA3LDIxOA0KCVMxODAuNjA4LDIxMi41MjgsMTY4LjUxNiwyMDMuMzMyeiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsNDM4aC01NGMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGg1NGM1LjUyMiwwLDEwLTQuNDc3LDEwLTEwUzI3MS41MjksNDM4LDI2Ni4wMDcsNDM4eiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsMzgyaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwzODIsMjY2LjAwNywzODJ6Ii8+DQo8cGF0aCBkPSJNMjY2LjAwNywzMjZoLTE0MmMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGgxNDJjNS41MjIsMCwxMC00LjQ3NywxMC0xMFMyNzEuNTI5LDMyNiwyNjYuMDA3LDMyNnoiLz4NCjxwYXRoIGQ9Ik04OC4zNjYsMjcyLjkzYy0xLjg1OS0xLjg2LTQuNDM5LTIuOTMtNy4wNzktMi45M2MtMi42MzEsMC01LjIxMSwxLjA3LTcuMDcsMi45M2MtMS44NiwxLjg2LTIuOTMsNC40NC0yLjkzLDcuMDcNCglzMS4wNjksNS4yMSwyLjkzLDcuMDdjMS44NywxLjg2LDQuNDM5LDIuOTMsNy4wNywyLjkzYzIuNjQsMCw1LjIxLTEuMDcsNy4wNzktMi45M2MxLjg2LTEuODYsMi45MzEtNC40NCwyLjkzMS03LjA3DQoJUzkwLjIyNywyNzQuNzksODguMzY2LDI3Mi45M3oiLz4NCjxwYXRoIGQ9Ik04OC4zNjYsMzI4LjkzYy0xLjg2OS0xLjg2LTQuNDM5LTIuOTMtNy4wNzktMi45M2MtMi42MzEsMC01LjIsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3DQoJczEuMDY5LDUuMjEsMi45Myw3LjA3YzEuODcsMS44Niw0LjQzOSwyLjkzLDcuMDcsMi45M2MyLjY0LDAsNS4yMS0xLjA3LDcuMDc5LTIuOTNjMS44Ni0xLjg2LDIuOTMxLTQuNDQsMi45MzEtNy4wNw0KCVM5MC4yMjcsMzMwLjc5LDg4LjM2NiwzMjguOTN6Ii8+DQo8cGF0aCBkPSJNODEuMjg3LDM4MmMtMi42MzEsMC01LjIsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3czEuMDY5LDUuMjEsMi45Myw3LjA3DQoJYzEuODU5LDEuODYsNC40MzksMi45Myw3LjA3LDIuOTNjMi42NCwwLDUuMjItMS4wNyw3LjA3OS0yLjkzYzEuODYtMS44NiwyLjkzMS00LjQ0LDIuOTMxLTcuMDdzLTEuMDctNS4yMS0yLjkzMS03LjA3DQoJQzg2LjQ5NywzODMuMDcsODMuOTI3LDM4Miw4MS4yODcsMzgyeiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsMjcwaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwyNzAsMjY2LjAwNywyNzB6Ii8+DQo8cGF0aCBkPSJNNDkxLjAwMiwxMzAuMzJjLTkuNzE1LTUuNjA5LTIxLjAzMy03LjA5OS0zMS44NzEtNC4xOTZjLTEwLjgzNiwyLjkwNC0xOS44OTQsOS44NTQtMjUuNTAyLDE5LjU2OUwzMDcuNzg3LDM2My42NTYNCgljLTAuNjg5LDEuMTk1LTEuMTI1LDIuNTItMS4yNzgsMy44OTFsLTguODU4LDc5LjM0NGMtMC40NCwzLjk0OCwxLjQ5OCw3Ljc4Myw0LjkzOCw5Ljc3YzEuNTUzLDAuODk2LDMuMjc4LDEuMzQsNC45OTksMS4zNA0KCWMyLjA5MiwwLDQuMTc2LTAuNjU1LDUuOTMxLTEuOTQ4bDY0LjI4NC00Ny4zNDRjMS4xMTEtMC44MTgsMi4wNDEtMS44NTcsMi43My0zLjA1MmwxMjUuODQxLTIxNy45NjMNCglDNTE3Ljk1NCwxNjcuNjM4LDUxMS4wNTgsMTQxLjksNDkxLjAwMiwxMzAuMzJ6IE0zMjQuNjg5LDM4NC45NjJsMjguOTQyLDE2LjcxbC0zMy41NjgsMjQuNzIyTDMyNC42ODksMzg0Ljk2MnogTTM2OC4yMTMsMzg2Ljk5Ng0KCWwtMzguMTA1LTIybDEwMC45ODUtMTc0LjkxbDM4LjEwNSwyMkwzNjguMjEzLDM4Ni45OTZ6IE00ODkuMDU0LDE3Ny42OTNsLTkuODU3LDE3LjA3M2wtMzguMTA1LTIybDkuODU3LTE3LjA3Mw0KCWMyLjkzOC01LjA4OSw3LjY4Mi04LjcyOSwxMy4zNTgtMTAuMjVjNS42NzgtMS41MjIsMTEuNjA2LTAuNzQsMTYuNjk0LDIuMTk4YzUuMDg5LDIuOTM4LDguNzI5LDcuNjgyLDEwLjI1LDEzLjM1OA0KCUM0OTIuNzcyLDE2Ni42NzUsNDkxLjk5MiwxNzIuNjA0LDQ4OS4wNTQsMTc3LjY5M3oiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K'
            );
            introImg.setAttribute('style', 'width: 1.5em');
            introImg.setAttribute(
              'src',
              'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQzg3MDsiIGQ9Ik00NDMsNTAyLjA2M0gxNDljLTExLjA0NiwwLTIwLTguOTU0LTIwLTIwdi0zNzJjMC0xMS4wNDYsOC45NTQtMjAsMjAtMjBoMjk0DQoJYzExLjA0NiwwLDIwLDguOTU0LDIwLDIwdjM3MkM0NjMsNDkzLjEwOSw0NTQuMDQ2LDUwMi4wNjMsNDQzLDUwMi4wNjN6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZEQUEwOyIgZD0iTTQwMyw0NjIuMDYzSDEwOWMtMTEuMDQ2LDAtMjAtOC45NTQtMjAtMjB2LTM3MmMwLTExLjA0Niw4Ljk1NC0yMCwyMC0yMGgyOTQNCgljMTEuMDQ2LDAsMjAsOC45NTQsMjAsMjB2MzcyQzQyMyw0NTMuMTA5LDQxNC4wNDYsNDYyLjA2Myw0MDMsNDYyLjA2M3oiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzYyLjkzNyw0MjJoLTI5NGMtMTEuMDQ2LDAtMjAtOC45NTQtMjAtMjBWMzBjMC0xMS4wNDYsOC45NTQtMjAsMjAtMjBoMjk0YzExLjA0NiwwLDIwLDguOTU0LDIwLDIwDQoJdjM3MkMzODIuOTM3LDQxMy4wNDYsMzczLjk4Miw0MjIsMzYyLjkzNyw0MjJ6Ii8+DQo8cmVjdCB4PSIxMDQuOTQiIHk9Ijg0IiBzdHlsZT0iZmlsbDojQkFFRTgzOyIgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2Ii8+DQo8cGF0aCBkPSJNMzYyLjkzNyw0MzJoLTI5NGMtMTYuNTQyLDAtMzAtMTMuNDU4LTMwLTMwVjIxNi4zMzNjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMGM1LjUyMiwwLDEwLDQuNDc3LDEwLDEwVjQwMg0KCWMwLDUuNTE0LDQuNDg2LDEwLDEwLDEwaDI5NGM1LjUxNCwwLDEwLTQuNDg2LDEwLTEwVjMwYzAtNS41MTQtNC40ODYtMTAtMTAtMTBoLTI5NGMtNS41MTQsMC0xMCw0LjQ4Ni0xMCwxMHYxMDINCgljMCw1LjUyMy00LjQ3OCwxMC0xMCwxMGMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMFYzMGMwLTE2LjU0MiwxMy40NTgtMzAsMzAtMzBoMjk0YzE2LjU0MiwwLDMwLDEzLjQ1OCwzMCwzMHYzNzINCglDMzkyLjkzNyw0MTguNTQyLDM3OS40NzksNDMyLDM2Mi45MzcsNDMyeiIvPg0KPHBhdGggZD0iTTQ4LjkzNywxODYuNzhjLTIuNjMsMC01LjIxLTEuMDctNy4wNy0yLjkzYy0xLjg2LTEuODctMi45My00LjQ0LTIuOTMtNy4wOGMwLTIuNjIsMS4wNjktNS4yLDIuOTMtNy4wNw0KCWMxLjg2LTEuODYsNC40NC0yLjkyLDcuMDctMi45MmMyLjYzLDAsNS4yMSwxLjA2LDcuMDY5LDIuOTJjMS44NiwxLjg3LDIuOTMxLDQuNDQsMi45MzEsNy4wN2MwLDIuNjQtMS4wNyw1LjIyLTIuOTMxLDcuMDgNCglDNTQuMTQ2LDE4NS43MSw1MS41NjYsMTg2Ljc4LDQ4LjkzNywxODYuNzh6Ii8+DQo8cGF0aCBkPSJNODguOTk2LDQ3Mi4wNmMtMi42MywwLTUuMjEtMS4wNi03LjA2OS0yLjkzYy0xLjg2LTEuODYtMi45MzEtNC40My0yLjkzMS03LjA3YzAtMi42MywxLjA3LTUuMjEsMi45MzEtNy4wNw0KCWMxLjg1OS0xLjg2LDQuNDM5LTIuOTMsNy4wNjktMi45M2MyLjY0MSwwLDUuMjEsMS4wNyw3LjA3LDIuOTNzMi45Myw0LjQ0LDIuOTMsNy4wN2MwLDIuNjQtMS4wNjksNS4yMS0yLjkzLDcuMDcNCglDOTQuMjA2LDQ3MSw5MS42MzcsNDcyLjA2LDg4Ljk5Niw0NzIuMDZ6Ii8+DQo8cGF0aCBkPSJNNDAzLDQ3Mi4wNjNIMTI5Yy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDI3NGM1LjUxNCwwLDEwLTQuNDg2LDEwLTEwdi0zOTJjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMA0KCXMxMCw0LjQ3NywxMCwxMHYzOTJDNDMzLDQ1OC42MDUsNDE5LjU0Miw0NzIuMDYzLDQwMyw0NzIuMDYzeiIvPg0KPHBhdGggZD0iTTQ0My4wNjMsNTEyaC0zMTRjLTUuNTIyLDAtMTAtNC40NzctMTAtMTBzNC40NzgtMTAsMTAtMTBoMzE0YzUuNTE0LDAsMTAtNC40ODYsMTAtMTBWOTBjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMA0KCXMxMCw0LjQ3NywxMCwxMHYzOTJDNDczLjA2Myw0OTguNTQyLDQ1OS42MDUsNTEyLDQ0My4wNjMsNTEyeiIvPg0KPHBhdGggZD0iTTIwMC45MzcsMTkwaC05NmMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMFY4NGMwLTUuNTIzLDQuNDc4LTEwLDEwLTEwaDk2YzUuNTIyLDAsMTAsNC40NzcsMTAsMTB2OTYNCglDMjEwLjkzNywxODUuNTIzLDIwNi40NTksMTkwLDIwMC45MzcsMTkweiBNMTE0LjkzNywxNzBoNzZWOTRoLTc2VjE3MHoiLz4NCjxwYXRoIGQ9Ik0xMjguMDM1LDI4Ni4xMjdMMTI4LjAzNSwyODYuMTI3Yy0yLjY1MiwwLTUuMTk1LTEuMDU0LTcuMDcxLTIuOTI5bC0xOS40MzItMTkuNDMyYy0zLjkwNS0zLjkwNS0zLjkwNS0xMC4yMzcsMC0xNC4xNDINCgljMy45MDgtMy45MDQsMTAuMjM4LTMuOTA1LDE0LjE0MywwbDEyLjM2LDEyLjM2MWwyNi41ODMtMjYuNTgzYzMuOTA3LTMuOTA1LDEwLjIzNy0zLjkwNCwxNC4xNDMsMA0KCWMzLjkwNSwzLjkwNSwzLjkwNSwxMC4yMzcsMCwxNC4xNDJsLTMzLjY1NCwzMy42NTRDMTMzLjIzLDI4NS4wNzMsMTMwLjY4OCwyODYuMTI3LDEyOC4wMzUsMjg2LjEyN3oiLz4NCjxwYXRoIGQ9Ik0zMzIuNjA0LDI2OUgyMTUuOTM3Yy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDExNi42NjdjNS41MjIsMCwxMCw0LjQ3NywxMCwxMA0KCUMzNDIuNjA0LDI2NC41MjMsMzM4LjEyNiwyNjksMzMyLjYwNCwyNjl6Ii8+DQo8cGF0aCBkPSJNMzI2LjkzNyw5NGgtNzBjLTUuNTIyLDAtMTAtNC40NzctMTAtMTBzNC40NzgtMTAsMTAtMTBoNzBjNS41MjIsMCwxMCw0LjQ3NywxMCwxMFMzMzIuNDU5LDk0LDMyNi45MzcsOTR6Ii8+DQo8cGF0aCBkPSJNMzI2LjkzNywxNDJoLTcwYy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDcwYzUuNTIyLDAsMTAsNC40NzcsMTAsMTANCglDMzM2LjkzNywxMzcuNTIzLDMzMi40NTksMTQyLDMyNi45MzcsMTQyeiIvPg0KPHBhdGggZD0iTTMyNi45MzcsMTkwaC03MGMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3OC0xMCwxMC0xMGg3MGM1LjUyMiwwLDEwLDQuNDc3LDEwLDEwUzMzMi40NTksMTkwLDMyNi45MzcsMTkweiIvPg0KPHBhdGggZD0iTTEyOC4wMzUsMzYyLjQ5NEwxMjguMDM1LDM2Mi40OTRjLTIuNjUyLDAtNS4xOTUtMS4wNTQtNy4wNzEtMi45MjlsLTE5LjQzMi0xOS40MzJjLTMuOTA1LTMuOTA1LTMuOTA1LTEwLjIzNywwLTE0LjE0Mg0KCWMzLjkwOC0zLjkwNCwxMC4yMzgtMy45MDUsMTQuMTQzLDBsMTIuMzYsMTIuMzYxbDI2LjU4My0yNi41ODNjMy45MDctMy45MDUsMTAuMjM3LTMuOTA0LDE0LjE0MywwDQoJYzMuOTA1LDMuOTA1LDMuOTA1LDEwLjIzNywwLDE0LjE0MmwtMzMuNjU0LDMzLjY1NEMxMzMuMjMsMzYxLjQ0LDEzMC42ODgsMzYyLjQ5NCwxMjguMDM1LDM2Mi40OTR6Ii8+DQo8cGF0aCBkPSJNMzMyLjYwNCwzNDVIMjE1LjkzN2MtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3OC0xMCwxMC0xMGgxMTYuNjY3YzUuNTIyLDAsMTAsNC40NzcsMTAsMTBTMzM4LjEyNiwzNDUsMzMyLjYwNCwzNDV6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=='
            );
            apId.setAttribute('style', 'display:none;');
            listNum.setAttribute('style', 'display:none;');

            nameTh.textContent = applys[j].user_name;
            areaTh.textContent = applys[j].ap_area;
            taskTh.textContent = applys[j].ap_task;
            apId.textContent = applys[j].ap_id;
            listNum.textContent = dNum;

            myTr.appendChild(nameTh);
            myTr.appendChild(cvTh);
            myTr.appendChild(introTh);
            myTr.appendChild(areaTh);
            myTr.appendChild(taskTh);
            myTr.appendChild(apId);
            myTr.appendChild(listNum);
            cvTh.appendChild(cvLink);
            cvLink.appendChild(cvImg);
            introTh.appendChild(introLink);
            introLink.appendChild(introImg);
          }
          //페이지네이션
          let totalPage = jsonObj['totalPage'];
          let pageNumbers = document.querySelector('#failPageNumbers');
          let pageNumber;
          for (let p = 0; p < totalPage; p++) {
            let page = document.createElement('a');
            page.setAttribute('class', 'Failpage-link');
            page.textContent = p + 1;

            pageNumbers.appendChild(page);

            pageNumber = document.querySelectorAll('.Failpage-link');

            pageNumber[p].addEventListener('click', () => {
              $('#listRejectedCandidates').empty();
              $('.Failpage-link').removeClass('active');

              pageNumber[p].classList.add('active');

              requestFailURL = `/application/etp/employ/list/${dNum}?page=${p + 1}&pass=불합격`;

              let requestFail = new XMLHttpRequest();
              requestFail.open('GET', requestPassURL);

              requestFail.responseType = 'json';
              requestFail.send();

              requestFail.onload = function () {
                let jsonObj = requestFail.response;
                applyFail2(jsonObj);
              };

              function applyFail2(jsonObj) {
                let applys = jsonObj['dtoList'];
                let userId;
                let introNum;
                for (let j = 0; j < applys.length; j++) {
                  let myTr = document.createElement('tr');
                  listRejectedCandidates.appendChild(myTr);

                  let nameTh = document.createElement('td');
                  let cvTh = document.createElement('td');
                  let introTh = document.createElement('td');
                  let areaTh = document.createElement('td');
                  let taskTh = document.createElement('td');
                  let cvLink = document.createElement('a');
                  let introLink = document.createElement('a');
                  let cvImg = document.createElement('img');
                  let introImg = document.createElement('img');
                  let apId = document.createElement('td');
                  let listNum = document.createElement('td');
                  userId = applys[j].user_id;
                  introNum = applys[j].intro_num;
                  listNum.setAttribute('class', 'listNum');
                  cvLink.setAttribute('href', '/application/etp/cv/read?id=' + userId);
                  cvLink.setAttribute('target', '_black');
                  introLink.setAttribute('href', '/application/etp/introduce/read?num=' + introNum);
                  introLink.setAttribute('target', '_black');
                  cvImg.setAttribute('style', 'width: 1.5em');
                  cvImg.setAttribute(
                    'src',
                    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zOTQuMDA3LDUwMmgtMzY0Yy0xMS4wNDYsMC0yMC04Ljk1NC0yMC0yMFYzMGMwLTExLjA0Niw4Ljk1NC0yMCwyMC0yMGgzNjRjMTEuMDQ2LDAsMjAsOC45NTQsMjAsMjANCgl2NDUyQzQxNC4wMDcsNDkzLjA0Niw0MDUuMDUzLDUwMiwzOTQuMDA3LDUwMnoiLz4NCjxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZFNjY2MzsiIGN4PSIyMTIuMDEiIGN5PSIxNDYiIHI9IjgyIi8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZDREFDOyIgZD0iTTIzOC4wMDcsMTM1LjV2Ni41YzAsMTQuMzU5LTExLjY0MSwyNi0yNiwyNmwwLDBsMCwwYy0xNC4zNTksMC0yNi0xMS42NDEtMjYtMjZ2LTYuNQ0KCWMwLTE0LjM1OSwxMS42NDEtMjYsMjYtMjZsMCwwQzIyNi4zNjYsMTA5LjUsMjM4LjAwNywxMjEuMTQxLDIzOC4wMDcsMTM1LjV6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojQTVEREZGOyIgZD0iTTIxMi4wMDcsMTY4TDIxMi4wMDcsMTY4Yy0yNS4zOCwwLTQ3LjA2NCwxNS43NjctNTUuODMyLDM4LjAzMw0KCUMxNzAuODE1LDIxOS42NTUsMTkwLjQzMiwyMjgsMjEyLjAwNywyMjhzNDEuMTkyLTguMzQ1LDU1LjgzMi0yMS45NjdDMjU5LjA3MSwxODMuNzY3LDIzNy4zODcsMTY4LDIxMi4wMDcsMTY4eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQkM1MzsiIGQ9Ik00MzYuNTc0LDE2MC41OWw1LjcxNC05Ljg5N2M4LjgzNy0xNS4zMDUsMjguNDA3LTIwLjU0OSw0My43MTMtMTEuNzEzbDAsMA0KCWMxNS4zMDUsOC44MzcsMjAuNTQ5LDI4LjQwNywxMS43MTMsNDMuNzEzTDM3MS44NzMsNDAwLjY1NmwtNTUuNDI2LTMybDU0LjI4Mi05NC4wMkw0MzYuNTc0LDE2MC41OXoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRTY2NjM7IiBkPSJNNDg2LjAwMiwxMzguOThMNDg2LjAwMiwxMzguOThjLTE1LjMwNS04LjgzNy0zNC44NzYtMy41OTMtNDMuNzEzLDExLjcxM2wtMTQuODU3LDI1LjczM2w1NS40MjYsMzINCglsMTQuODU3LTI1LjczM0M1MDYuNTUxLDE2Ny4zODgsNTAxLjMwNywxNDcuODE3LDQ4Ni4wMDIsMTM4Ljk4eiIvPg0KPHBvbHlnb24gc3R5bGU9ImZpbGw6IzlBRDhGRjsiIHBvaW50cz0iMzcxLjg3Myw0MDAuNjU2IDMwNy41ODksNDQ4IDMxNi40NDcsMzY4LjY1NiAiLz4NCjxwYXRoIGQ9Ik00MTQuMDA3LDM5OC4zMjhjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBWNDgyYzAsNS41MTQtNC40ODYsMTAtMTAsMTBoLTM2NGMtNS41MTQsMC0xMC00LjQ4Ni0xMC0xMFYzMA0KCWMwLTUuNTE0LDQuNDg2LTEwLDEwLTEwaDM2NGM1LjUxNCwwLDEwLDQuNDg2LDEwLDEwdjEwOC43NWMwLDUuNTIzLDQuNDc4LDEwLDEwLDEwczEwLTQuNDc3LDEwLTEwVjMwYzAtMTYuNTQyLTEzLjQ1OC0zMC0zMC0zMA0KCWgtMzY0Yy0xNi41NDIsMC0zMCwxMy40NTgtMzAsMzB2NDUyYzAsMTYuNTQyLDEzLjQ1OCwzMCwzMCwzMGgzNjRjMTYuNTQyLDAsMzAtMTMuNDU4LDMwLTMwdi03My42NzINCglDNDI0LjAwNyw0MDIuODA1LDQxOS41MjksMzk4LjMyOCw0MTQuMDA3LDM5OC4zMjh6Ii8+DQo8cGF0aCBkPSJNMzA0LjAwNywxNDZjMC01MC43MjktNDEuMjcxLTkyLTkyLTkycy05Miw0MS4yNzEtOTIsOTJjMCwyNi4zMTcsMTEuMTEsNTAuMDg1LDI4Ljg4Miw2Ni44NjkNCgljMC4zMzMsMC4zNTYsMC42ODcsMC42OTMsMS4wNzQsMWMxNi4zNzEsMTQuOTc5LDM4LjE1OCwyNC4xMyw2Mi4wNDMsMjQuMTNzNDUuNjcyLTkuMTUyLDYyLjA0My0yNC4xMw0KCWMwLjM4Ny0wLjMwNywwLjc0MS0wLjY0NSwxLjA3NC0xQzI5Mi44OTcsMTk2LjA4NSwzMDQuMDA3LDE3Mi4zMTcsMzA0LjAwNywxNDZ6IE0yMTIuMDA3LDc0YzM5LjcwMSwwLDcyLDMyLjI5OSw3Miw3Mg0KCWMwLDE1Ljk2Ny01LjIzMSwzMC43My0xNC4wNiw0Mi42ODNjLTcuMzc1LTEwLjkzOC0xNy41OTYtMTkuNDQ1LTI5LjQ2My0yNC42OTdjNC43MS02LjA4Nyw3LjUyMy0xMy43MTIsNy41MjMtMjEuOTg2di02LjUNCgljMC0xOS44NTEtMTYuMTQ5LTM2LTM2LTM2cy0zNiwxNi4xNDktMzYsMzZ2Ni41YzAsOC4yNzQsMi44MTMsMTUuODk5LDcuNTIzLDIxLjk4NmMtMTEuODY3LDUuMjUyLTIyLjA4OCwxMy43NTktMjkuNDYzLDI0LjY5Nw0KCWMtOC44MjktMTEuOTUzLTE0LjA2LTI2LjcxNi0xNC4wNi00Mi42ODNDMTQwLjAwNywxMDYuMjk5LDE3Mi4zMDYsNzQsMjEyLjAwNyw3NHogTTE5Ni4wMDcsMTQydi02LjVjMC04LjgyMiw3LjE3OC0xNiwxNi0xNg0KCXMxNiw3LjE3OCwxNiwxNnY2LjVjMCw4LjgyMi03LjE3OCwxNi0xNiwxNlMxOTYuMDA3LDE1MC44MjIsMTk2LjAwNywxNDJ6IE0xNjguNTE2LDIwMy4zMzINCgljOC43ODktMTUuNTg1LDI1LjE5LTI1LjMzMiw0My40OTEtMjUuMzMyczM0LjcwMiw5Ljc0Nyw0My40OTEsMjUuMzMyQzI0My40MDUsMjEyLjUyOCwyMjguMzM2LDIxOCwyMTIuMDA3LDIxOA0KCVMxODAuNjA4LDIxMi41MjgsMTY4LjUxNiwyMDMuMzMyeiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsNDM4aC01NGMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGg1NGM1LjUyMiwwLDEwLTQuNDc3LDEwLTEwUzI3MS41MjksNDM4LDI2Ni4wMDcsNDM4eiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsMzgyaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwzODIsMjY2LjAwNywzODJ6Ii8+DQo8cGF0aCBkPSJNMjY2LjAwNywzMjZoLTE0MmMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHM0LjQ3OCwxMCwxMCwxMGgxNDJjNS41MjIsMCwxMC00LjQ3NywxMC0xMFMyNzEuNTI5LDMyNiwyNjYuMDA3LDMyNnoiLz4NCjxwYXRoIGQ9Ik04OC4zNjYsMjcyLjkzYy0xLjg1OS0xLjg2LTQuNDM5LTIuOTMtNy4wNzktMi45M2MtMi42MzEsMC01LjIxMSwxLjA3LTcuMDcsMi45M2MtMS44NiwxLjg2LTIuOTMsNC40NC0yLjkzLDcuMDcNCglzMS4wNjksNS4yMSwyLjkzLDcuMDdjMS44NywxLjg2LDQuNDM5LDIuOTMsNy4wNywyLjkzYzIuNjQsMCw1LjIxLTEuMDcsNy4wNzktMi45M2MxLjg2LTEuODYsMi45MzEtNC40NCwyLjkzMS03LjA3DQoJUzkwLjIyNywyNzQuNzksODguMzY2LDI3Mi45M3oiLz4NCjxwYXRoIGQ9Ik04OC4zNjYsMzI4LjkzYy0xLjg2OS0xLjg2LTQuNDM5LTIuOTMtNy4wNzktMi45M2MtMi42MzEsMC01LjIsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3DQoJczEuMDY5LDUuMjEsMi45Myw3LjA3YzEuODcsMS44Niw0LjQzOSwyLjkzLDcuMDcsMi45M2MyLjY0LDAsNS4yMS0xLjA3LDcuMDc5LTIuOTNjMS44Ni0xLjg2LDIuOTMxLTQuNDQsMi45MzEtNy4wNw0KCVM5MC4yMjcsMzMwLjc5LDg4LjM2NiwzMjguOTN6Ii8+DQo8cGF0aCBkPSJNODEuMjg3LDM4MmMtMi42MzEsMC01LjIsMS4wNy03LjA3LDIuOTNjLTEuODYsMS44Ni0yLjkzLDQuNDQtMi45Myw3LjA3czEuMDY5LDUuMjEsMi45Myw3LjA3DQoJYzEuODU5LDEuODYsNC40MzksMi45Myw3LjA3LDIuOTNjMi42NCwwLDUuMjItMS4wNyw3LjA3OS0yLjkzYzEuODYtMS44NiwyLjkzMS00LjQ0LDIuOTMxLTcuMDdzLTEuMDctNS4yMS0yLjkzMS03LjA3DQoJQzg2LjQ5NywzODMuMDcsODMuOTI3LDM4Miw4MS4yODcsMzgyeiIvPg0KPHBhdGggZD0iTTI2Ni4wMDcsMjcwaC0xNDJjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTQyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBTMjcxLjUyOSwyNzAsMjY2LjAwNywyNzB6Ii8+DQo8cGF0aCBkPSJNNDkxLjAwMiwxMzAuMzJjLTkuNzE1LTUuNjA5LTIxLjAzMy03LjA5OS0zMS44NzEtNC4xOTZjLTEwLjgzNiwyLjkwNC0xOS44OTQsOS44NTQtMjUuNTAyLDE5LjU2OUwzMDcuNzg3LDM2My42NTYNCgljLTAuNjg5LDEuMTk1LTEuMTI1LDIuNTItMS4yNzgsMy44OTFsLTguODU4LDc5LjM0NGMtMC40NCwzLjk0OCwxLjQ5OCw3Ljc4Myw0LjkzOCw5Ljc3YzEuNTUzLDAuODk2LDMuMjc4LDEuMzQsNC45OTksMS4zNA0KCWMyLjA5MiwwLDQuMTc2LTAuNjU1LDUuOTMxLTEuOTQ4bDY0LjI4NC00Ny4zNDRjMS4xMTEtMC44MTgsMi4wNDEtMS44NTcsMi43My0zLjA1MmwxMjUuODQxLTIxNy45NjMNCglDNTE3Ljk1NCwxNjcuNjM4LDUxMS4wNTgsMTQxLjksNDkxLjAwMiwxMzAuMzJ6IE0zMjQuNjg5LDM4NC45NjJsMjguOTQyLDE2LjcxbC0zMy41NjgsMjQuNzIyTDMyNC42ODksMzg0Ljk2MnogTTM2OC4yMTMsMzg2Ljk5Ng0KCWwtMzguMTA1LTIybDEwMC45ODUtMTc0LjkxbDM4LjEwNSwyMkwzNjguMjEzLDM4Ni45OTZ6IE00ODkuMDU0LDE3Ny42OTNsLTkuODU3LDE3LjA3M2wtMzguMTA1LTIybDkuODU3LTE3LjA3Mw0KCWMyLjkzOC01LjA4OSw3LjY4Mi04LjcyOSwxMy4zNTgtMTAuMjVjNS42NzgtMS41MjIsMTEuNjA2LTAuNzQsMTYuNjk0LDIuMTk4YzUuMDg5LDIuOTM4LDguNzI5LDcuNjgyLDEwLjI1LDEzLjM1OA0KCUM0OTIuNzcyLDE2Ni42NzUsNDkxLjk5MiwxNzIuNjA0LDQ4OS4wNTQsMTc3LjY5M3oiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K'
                  );
                  introImg.setAttribute('style', 'width: 1.5em');
                  introImg.setAttribute(
                    'src',
                    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQzg3MDsiIGQ9Ik00NDMsNTAyLjA2M0gxNDljLTExLjA0NiwwLTIwLTguOTU0LTIwLTIwdi0zNzJjMC0xMS4wNDYsOC45NTQtMjAsMjAtMjBoMjk0DQoJYzExLjA0NiwwLDIwLDguOTU0LDIwLDIwdjM3MkM0NjMsNDkzLjEwOSw0NTQuMDQ2LDUwMi4wNjMsNDQzLDUwMi4wNjN6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZEQUEwOyIgZD0iTTQwMyw0NjIuMDYzSDEwOWMtMTEuMDQ2LDAtMjAtOC45NTQtMjAtMjB2LTM3MmMwLTExLjA0Niw4Ljk1NC0yMCwyMC0yMGgyOTQNCgljMTEuMDQ2LDAsMjAsOC45NTQsMjAsMjB2MzcyQzQyMyw0NTMuMTA5LDQxNC4wNDYsNDYyLjA2Myw0MDMsNDYyLjA2M3oiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzYyLjkzNyw0MjJoLTI5NGMtMTEuMDQ2LDAtMjAtOC45NTQtMjAtMjBWMzBjMC0xMS4wNDYsOC45NTQtMjAsMjAtMjBoMjk0YzExLjA0NiwwLDIwLDguOTU0LDIwLDIwDQoJdjM3MkMzODIuOTM3LDQxMy4wNDYsMzczLjk4Miw0MjIsMzYyLjkzNyw0MjJ6Ii8+DQo8cmVjdCB4PSIxMDQuOTQiIHk9Ijg0IiBzdHlsZT0iZmlsbDojQkFFRTgzOyIgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2Ii8+DQo8cGF0aCBkPSJNMzYyLjkzNyw0MzJoLTI5NGMtMTYuNTQyLDAtMzAtMTMuNDU4LTMwLTMwVjIxNi4zMzNjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMGM1LjUyMiwwLDEwLDQuNDc3LDEwLDEwVjQwMg0KCWMwLDUuNTE0LDQuNDg2LDEwLDEwLDEwaDI5NGM1LjUxNCwwLDEwLTQuNDg2LDEwLTEwVjMwYzAtNS41MTQtNC40ODYtMTAtMTAtMTBoLTI5NGMtNS41MTQsMC0xMCw0LjQ4Ni0xMCwxMHYxMDINCgljMCw1LjUyMy00LjQ3OCwxMC0xMCwxMGMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMFYzMGMwLTE2LjU0MiwxMy40NTgtMzAsMzAtMzBoMjk0YzE2LjU0MiwwLDMwLDEzLjQ1OCwzMCwzMHYzNzINCglDMzkyLjkzNyw0MTguNTQyLDM3OS40NzksNDMyLDM2Mi45MzcsNDMyeiIvPg0KPHBhdGggZD0iTTQ4LjkzNywxODYuNzhjLTIuNjMsMC01LjIxLTEuMDctNy4wNy0yLjkzYy0xLjg2LTEuODctMi45My00LjQ0LTIuOTMtNy4wOGMwLTIuNjIsMS4wNjktNS4yLDIuOTMtNy4wNw0KCWMxLjg2LTEuODYsNC40NC0yLjkyLDcuMDctMi45MmMyLjYzLDAsNS4yMSwxLjA2LDcuMDY5LDIuOTJjMS44NiwxLjg3LDIuOTMxLDQuNDQsMi45MzEsNy4wN2MwLDIuNjQtMS4wNyw1LjIyLTIuOTMxLDcuMDgNCglDNTQuMTQ2LDE4NS43MSw1MS41NjYsMTg2Ljc4LDQ4LjkzNywxODYuNzh6Ii8+DQo8cGF0aCBkPSJNODguOTk2LDQ3Mi4wNmMtMi42MywwLTUuMjEtMS4wNi03LjA2OS0yLjkzYy0xLjg2LTEuODYtMi45MzEtNC40My0yLjkzMS03LjA3YzAtMi42MywxLjA3LTUuMjEsMi45MzEtNy4wNw0KCWMxLjg1OS0xLjg2LDQuNDM5LTIuOTMsNy4wNjktMi45M2MyLjY0MSwwLDUuMjEsMS4wNyw3LjA3LDIuOTNzMi45Myw0LjQ0LDIuOTMsNy4wN2MwLDIuNjQtMS4wNjksNS4yMS0yLjkzLDcuMDcNCglDOTQuMjA2LDQ3MSw5MS42MzcsNDcyLjA2LDg4Ljk5Niw0NzIuMDZ6Ii8+DQo8cGF0aCBkPSJNNDAzLDQ3Mi4wNjNIMTI5Yy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDI3NGM1LjUxNCwwLDEwLTQuNDg2LDEwLTEwdi0zOTJjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMA0KCXMxMCw0LjQ3NywxMCwxMHYzOTJDNDMzLDQ1OC42MDUsNDE5LjU0Miw0NzIuMDYzLDQwMyw0NzIuMDYzeiIvPg0KPHBhdGggZD0iTTQ0My4wNjMsNTEyaC0zMTRjLTUuNTIyLDAtMTAtNC40NzctMTAtMTBzNC40NzgtMTAsMTAtMTBoMzE0YzUuNTE0LDAsMTAtNC40ODYsMTAtMTBWOTBjMC01LjUyMyw0LjQ3OC0xMCwxMC0xMA0KCXMxMCw0LjQ3NywxMCwxMHYzOTJDNDczLjA2Myw0OTguNTQyLDQ1OS42MDUsNTEyLDQ0My4wNjMsNTEyeiIvPg0KPHBhdGggZD0iTTIwMC45MzcsMTkwaC05NmMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMFY4NGMwLTUuNTIzLDQuNDc4LTEwLDEwLTEwaDk2YzUuNTIyLDAsMTAsNC40NzcsMTAsMTB2OTYNCglDMjEwLjkzNywxODUuNTIzLDIwNi40NTksMTkwLDIwMC45MzcsMTkweiBNMTE0LjkzNywxNzBoNzZWOTRoLTc2VjE3MHoiLz4NCjxwYXRoIGQ9Ik0xMjguMDM1LDI4Ni4xMjdMMTI4LjAzNSwyODYuMTI3Yy0yLjY1MiwwLTUuMTk1LTEuMDU0LTcuMDcxLTIuOTI5bC0xOS40MzItMTkuNDMyYy0zLjkwNS0zLjkwNS0zLjkwNS0xMC4yMzcsMC0xNC4xNDINCgljMy45MDgtMy45MDQsMTAuMjM4LTMuOTA1LDE0LjE0MywwbDEyLjM2LDEyLjM2MWwyNi41ODMtMjYuNTgzYzMuOTA3LTMuOTA1LDEwLjIzNy0zLjkwNCwxNC4xNDMsMA0KCWMzLjkwNSwzLjkwNSwzLjkwNSwxMC4yMzcsMCwxNC4xNDJsLTMzLjY1NCwzMy42NTRDMTMzLjIzLDI4NS4wNzMsMTMwLjY4OCwyODYuMTI3LDEyOC4wMzUsMjg2LjEyN3oiLz4NCjxwYXRoIGQ9Ik0zMzIuNjA0LDI2OUgyMTUuOTM3Yy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDExNi42NjdjNS41MjIsMCwxMCw0LjQ3NywxMCwxMA0KCUMzNDIuNjA0LDI2NC41MjMsMzM4LjEyNiwyNjksMzMyLjYwNCwyNjl6Ii8+DQo8cGF0aCBkPSJNMzI2LjkzNyw5NGgtNzBjLTUuNTIyLDAtMTAtNC40NzctMTAtMTBzNC40NzgtMTAsMTAtMTBoNzBjNS41MjIsMCwxMCw0LjQ3NywxMCwxMFMzMzIuNDU5LDk0LDMyNi45MzcsOTR6Ii8+DQo8cGF0aCBkPSJNMzI2LjkzNywxNDJoLTcwYy01LjUyMiwwLTEwLTQuNDc3LTEwLTEwczQuNDc4LTEwLDEwLTEwaDcwYzUuNTIyLDAsMTAsNC40NzcsMTAsMTANCglDMzM2LjkzNywxMzcuNTIzLDMzMi40NTksMTQyLDMyNi45MzcsMTQyeiIvPg0KPHBhdGggZD0iTTMyNi45MzcsMTkwaC03MGMtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3OC0xMCwxMC0xMGg3MGM1LjUyMiwwLDEwLDQuNDc3LDEwLDEwUzMzMi40NTksMTkwLDMyNi45MzcsMTkweiIvPg0KPHBhdGggZD0iTTEyOC4wMzUsMzYyLjQ5NEwxMjguMDM1LDM2Mi40OTRjLTIuNjUyLDAtNS4xOTUtMS4wNTQtNy4wNzEtMi45MjlsLTE5LjQzMi0xOS40MzJjLTMuOTA1LTMuOTA1LTMuOTA1LTEwLjIzNywwLTE0LjE0Mg0KCWMzLjkwOC0zLjkwNCwxMC4yMzgtMy45MDUsMTQuMTQzLDBsMTIuMzYsMTIuMzYxbDI2LjU4My0yNi41ODNjMy45MDctMy45MDUsMTAuMjM3LTMuOTA0LDE0LjE0MywwDQoJYzMuOTA1LDMuOTA1LDMuOTA1LDEwLjIzNywwLDE0LjE0MmwtMzMuNjU0LDMzLjY1NEMxMzMuMjMsMzYxLjQ0LDEzMC42ODgsMzYyLjQ5NCwxMjguMDM1LDM2Mi40OTR6Ii8+DQo8cGF0aCBkPSJNMzMyLjYwNCwzNDVIMjE1LjkzN2MtNS41MjIsMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3OC0xMCwxMC0xMGgxMTYuNjY3YzUuNTIyLDAsMTAsNC40NzcsMTAsMTBTMzM4LjEyNiwzNDUsMzMyLjYwNCwzNDV6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=='
                  );
                  apId.setAttribute('style', 'display:none;');
                  listNum.setAttribute('style', 'display:none;');

                  nameTh.textContent = applys[j].user_name;
                  areaTh.textContent = applys[j].ap_area;
                  taskTh.textContent = applys[j].ap_task;
                  apId.textContent = applys[j].ap_id;
                  listNum.textContent = dNum;

                  myTr.appendChild(nameTh);
                  myTr.appendChild(cvTh);
                  myTr.appendChild(introTh);
                  myTr.appendChild(areaTh);
                  myTr.appendChild(taskTh);
                  myTr.appendChild(apId);
                  myTr.appendChild(listNum);
                  cvTh.appendChild(cvLink);
                  cvLink.appendChild(cvImg);
                  introTh.appendChild(introLink);
                  introLink.appendChild(introImg);
                }
              }
            });
          }
        }
      },
      error: function (error) {
        alert('불합격실패');
        console.log(data2);
      },
    });
  }, // save() end
};

Fail.init();
