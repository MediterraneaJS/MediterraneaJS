function hasClass(ele, cls) {
  return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(ele, cls) {
  if (!this.hasClass(ele, cls)) {
    ele.className += ' ' + cls;
  }
}

function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
}

document.addEventListener('DOMContentLoaded', function (event) {
  var
    spy = new ScrollSpy(),
    nav = document.getElementsByClassName('pure-menu-link');

  spy.init();
  spy.spyOn(document.getElementById('speakers'));
  spy.spyOn(document.getElementById('schedule'));

  document.addEventListener('ScrollSpyBackInSight', function (event) {
    var
      i = nav.length,
      found = false;

    while (i >= 0 || !found) {
      if (nav[i] && nav[i].hash && nav[i].hash.substr(1) === event.data.id) {
        addClass(nav[i], 'active');
        found = true;
      }
      i--;
    }
  });

  document.addEventListener('ScrollSpyOutOfSight', function (event) {
    var
      i = nav.length,
      found = false;

    while (i >= 0 || !found) {
      console.log(nav[i]);
      if (nav[i] && nav[i].hash && nav[i].hash.substr(1) === event.data.id) {
        removeClass(nav[i], 'active');
        found = true;
      }
      i--;
    }
  });
});
