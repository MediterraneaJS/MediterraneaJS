function hasClass(ele, cls) {
  return ele.className.indexOf(cls) !== -1 ? true : false;
}

function addClass(ele, cls) {
  if (!this.hasClass(ele, cls)) {
    ele.className += ' ' + cls;
  }
}

function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    ele.className = ele.className.replace(cls, '');
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

    console.log('in:' + event.data.id);
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

    console.log('out: ' + event.data.id);
    while (i >= 0 || !found) {
      if (nav[i] && nav[i].hash && nav[i].hash.substr(1) === event.data.id) {
        removeClass(nav[i], 'active');
        found = true;
      }
      i--;
    }
  });
});
