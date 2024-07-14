chrome.cookies.getAll({ domain: 'cookies-http-only.vercel.app' }, function (cookies) {
  for (var i = 0; i < cookies.length; i++) {
    var row = document.createElement('tr');

    row.innerHTML =
      `</tr><th scope="row">` + cookies[i].name + '</th><td>' + cookies[i].value + '</td>';

    document.querySelector('#cookies tbody').appendChild(row);
  }
});
