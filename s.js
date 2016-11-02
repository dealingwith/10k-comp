function resetNote() {
  wds = [], tt = 0, b = document.getElementsByTagName('body')[0]
  wl = 40, wc = 40, evils = ['kill', 'inpieces', 'neverseethemagain', 'nofollowers', 'x_x', 'speakthistonoone', 'take', 'place', 'drive', 'road', 'get', 'andbringitto']
}

resetNote()
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
      var letters = wds.shift().split('')
      var worddiv = document.createElement('div')
      for (var n in letters) {
        var letterdiv = document.createElement('div')
        var letter = document.createTextNode(letters[n])
        tilt(letterdiv, 0, 1)
        letterdiv.appendChild(letter)
        worddiv.appendChild(letterdiv)
      }
      tilt(worddiv, 1, 0, 1)
      b.appendChild(worddiv)
    }, Math.random() * 1000 * i)
  }
}

function tilt(s, fontsize, font, othershit) {
  var n = Math.floor(Math.random() * 5) || 1
  var dir = n % 2 > 0 ? '-' : '+'
  var style ='transform: rotate(' + dir + n + 'deg)'
  if (fontsize) style += '; font-size:' + n*1.5 + 'em'
  if (othershit) style += '; margin:0 ' + Math.floor(Math.random() * 30) + 'px'
  if (font) style += '; font-family:"' + fonts[Math.floor(Math.random() * 100 / 2)] + '", serif; animation: fade-in 1s 1'
  if (!othershit && Math.random() * 100 < 10) style += '; color: white; background-color: #404040; padding: 0 4px'
  s.setAttribute('style', style)
}

function rgba(m) {
  var mm = m ? '.0' + Math.floor(Math.random() * 10) : 1
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
    var div = document.createElement('div')
    div.appendChild(document.createTextNode('Replay'))
    div.setAttribute('style', 
      'padding: .5em; border: 1px solid #e9e9e9; border-radius: 1em; margin: 2em; clear: left; cursor: pointer')
    div.setAttribute('onClick', 'startMessage()')
    b.setAttribute('style', 'background-color: white')
    b.appendChild(div)
    resetNote()
  }
  b.scrollTop = 100000
}

// great artists steal
// http://james.padolsey.com/javascript/random-word-generator/
function createRandomWord(length, evil) {
  var n = Math.floor(Math.random() * 100)
  if (evil && Math.random() * 100 < 10) {
    var word = evils.splice(rand(evils.length), 1)[0]
    return word
  }
  var consonants = 'bcdfghjklmnpqrstvwxyz',
    vowels = 'aeiou',
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
function rand(limit) {
  return Math.floor(Math.random()*limit);
}
function randomWord() {
  // make first and then some words a randomly generated word
  var n = Math.floor(Math.random() * 10) || 1
  if (wc == wl) {
    randomWordComplete({Word: 'Hello'})
  } else if (n % 2 == 0) {
    randomWordComplete({Word: createRandomWord(n, true)})
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

var fonts = ['Trattatello', 'American Typewriter', 'Andale Mono', 'Apple Casual', 'Apple Chancery', 'Apple Garamond', 'Apple Gothic', 'Arial sans', 'Ayuthaya', 'Baskerville', 'Big Caslon', 'Brush Script', 'Chalkboard', 'Chalkduster', 'Charcoal', 'Chicago', 'Cochin', 'Comic Sans', 'Cooper', 'Copperplate', 'Courier', 'Didot', 'Futura', 'Gadget', 'Geneva', 'Georgia', 'Gill Sans', 'Helvetica', 'Herculanum', 'Hoefler Text', 'Impact', 'Keyboard', 'Lucida Grande', 'Marker Felt', 'Menlo', 'Monaco', 'New Peninim', 'New York', 'Optima', 'Palatino', 'Papyrus', 'Plantagenet Cherokee', 'Sand', 'Skia', 'Tahoma', 'Techno', 'Textile', 'Times', 'Trebuchet MS', 'Verdana']
