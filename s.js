var wds = [], tt = 0, b = document.getElementsByTagName('body')[0], ti
var wl = 40, wc = 40
ti = setInterval(function() {
  if (tt > 3) tt = 0
  tilt(document.getElementsByClassName('t')[tt], 0)
  tt++
}, 100)
setTimeout(startMessage, 3500)
function startMessage() {
  randomWord()
  bgloop()
  clearInterval(ti)
  b.innerHTML = ''
}
function displayMessage() {
  for (var i in wds) {
    setTimeout(function() {
      var s = document.createElement('div')
      var st = document.createTextNode(wds.shift())
      s.appendChild(st)
      tilt(s, 1)
      b.appendChild(s)
    }, Math.random() * 1000 * i)
  }
}
function tilt(s, font) {
  var n = Math.floor(Math.random() * 5) || 1
  var dir = n % 2 > 0 ? '-' : '+'
  var style ='transform: rotate(' + dir + n + 'deg); margin: 0 ' +
    (Math.random() * 10) + 'px; ' //color: ' + rgba(0) + ';'
  if (font) style += ' font-size:' + n*1.5 + 'em'
  s.setAttribute('style', style)
}
function rgba(m) {
  mm = m ? '.0' + Math.floor(Math.random() * 10) : 1
  return 'rgba(' + Math.floor(Math.random() * 1000) + ',' +
    Math.floor(Math.random() * 1000) + ',' +
    Math.floor(Math.random() * 1000) + ',' + mm + ')'
}
function bgloop() {
  if (wds.length > 0) {
    setTimeout(function() { 
      b.setAttribute('style', 'background-color: ' + rgba(1))
      bgloop()
    }, Math.random() * 500)
  } else {
    var s = document.createElement('div')
    var st = document.createTextNode('Replay')
    s.appendChild(st)
    s.setAttribute('style', 
      'padding: .5em; border: 1px solid #e9e9e9; border-radius: 1em; margin: 2em; clear: left; cursor: pointer')
    s.setAttribute('onClick', 'startMessage()')
    b.setAttribute('style', 'background-color: white')
    b.appendChild(s)
    wc = wl
  }
  b.scrollTop = 100000
}
// http://james.padolsey.com/javascript/random-word-generator/
function createRandomWord(length) {
  var consonants = 'bcdfghjklmnpqrstvwxyz',
    vowels = 'aeiou',
    rand = function(limit) {
      return Math.floor(Math.random()*limit);
    },
    i, word='', length = parseInt(length,10),
    consonants = consonants.split(''),
    vowels = vowels.split('');
  for (i=0;i<length/2;i++) {
    var randConsonant = consonants[rand(consonants.length)],
      randVowel = vowels[rand(vowels.length)];
    word += (i===0) ? randConsonant.toUpperCase() : randConsonant;
    word += i*2<length-1 ? randVowel : '';
  }
  return word;
}
function randomWord() {
  // make first and then some words jibberish
  var n = Math.floor(Math.random() * 10) || 1
  if (wc == wl) {
    randomWordComplete({Word: 'Hello ' + createRandomWord(n) + ','})
  } else if (n % 3 == 0) {
    randomWordComplete({Word: createRandomWord(n)})
  } else {
    var requestStr = "http://www.setgetgo.com/randomword/get.php";
    $.ajax({
      type: "GET",
      url: requestStr,
      dataType: "jsonp",
      jsonpCallback: 'randomWordComplete'
    });
  }
}

function randomWordComplete(data) {
  wds.push(data.Word);
  wc--
  if (wc == 0) { displayMessage() } else { randomWord() }
}