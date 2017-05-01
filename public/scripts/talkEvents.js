navigator.serviceWorker.getRegistrations().then(function(registrations) {
 for(let registration of registrations) {
  registration.unregister()
} })

// Reveal~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Reveal.initialize({

  // The "normal" size of the presentation, aspect ratio will be preserved
  // when the presentation is scaled to fit different resolutions. Can be
  // specified using percentage units.
  width: 1024,
  height: 768,

  // Factor of the display size that should remain empty around the content
  margin: 0.1,

  // Bounds for smallest/largest possible scale to apply to content
  minScale: 0.2,
  maxScale: 1.5,

  center: false,

  // Display controls in the bottom right corner
  controls: false,

  // Display a presentation progress bar
  progress: false,

  // Display the page number of the current slide
  slideNumber: false,

  // Push each slide change to the browser history
  history: true,

  // Enable keyboard shortcuts for navigation
  keyboard: true,

  // Transition style
  transition: 'fade', // none/fade/slide/convex/concave/zoom

  // Transition speed
  transitionSpeed: 'default', // default/fast/slow

  // Transition style for full page slide backgrounds
  backgroundTransition: 'default', // none/fade/slide/convex/concave/zoom

  // Number of slides away from the current that are visible
  viewDistance: 2,

  // Parallax background image
  parallaxBackgroundImage: '', // e.g. "'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg'"

  // Parallax background size
  parallaxBackgroundSize: '', // CSS syntax, e.g. "2100px 900px"

  // Amount to move parallax background (horizontal and vertical) on slide change
  // Number, e.g. 100
  parallaxBackgroundHorizontal: '',
  parallaxBackgroundVertical: ''

});


window.addEventListener('keyup', function(e) {
  if (e.keyCode === 86) {
    document.getElementById('akai').play();
  }
}, false);

// set which animation to show
let currentAnimation = 'vis_speakers',
  allEls,
  totalEls,
  animateDom = function() {},
  useMic = false;
  // musicTrack = document.getElementById('warren');

// spectrum
Reveal.addEventListener( 'vis_speakers', function(ev) {
  screen.style.display = 'block';
  // musicTrack.play();
  currentAnimation = ev.type;

// 7
  screen.innerHTML = '<section class="vis-speakers"><div><img src="images/speakersHEY/01.jpg" /></div><div><img src="images/speakersHEY/02.jpg" /></div><div><img src="images/speakersHEY/03.jpg" /></div><div><img src="images/speakersHEY/04.jpg" /></div><div><img src="images/speakersHEY/05.jpg" /></div><div><img src="images/speakersHEY/06.jpg" /></div><div><img src="images/speakersHEY/07.jpg" /></section>';
  allEls = document.querySelectorAll('#screen div');
  totalEls = allEls.length;

  animateDom = function() {
    for (let i=0; i<totalEls; i++) {
      //style i
      allEls[i].style.backgroundColor = 'hsla('+i*40+',30%,50%,1)';

      var freqOp = (newFreqData[i*4]/255)+0.1;
      allEls[i].style.opacity = freqOp;
      allEls[i].style.filter = 'contrast('+(freqOp+1)+')';
    }
  }
}, false);

// spectrum
Reveal.addEventListener( 'vis_spectrum_sound', function(ev) {
  screen.style.display = 'block';
  currentAnimation = ev.type;

// 16
  screen.innerHTML = '<section class="vis-spectrum"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></section>';
  allEls = document.querySelectorAll('#screen i');
  totalEls = allEls.length;

  animateDom = function() {
    for (let i=0; i<totalEls; i++) {
      //style i
      allEls[i].style.backgroundColor = 'hsla('+i*20+',50%,50%,0.9)';
      allEls[i].style.border = '1px solid hsla('+i*20+',50%,50%,1)';

      var freqVol = newFreqData[i*2]/4;
      allEls[i].style.height = freqVol+'vh';
    }
  }
}, false);

// spectrum
Reveal.addEventListener( 'vis_vjing', function(ev) {
  screen.style.display = 'block';
  currentAnimation = ev.type;

  screen.innerHTML = '<div id="two-screens"><section class="vis-spectrum"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></section><section class="vis-speakers"><div><img src="images/speakersHEY/01.jpg" /></div><div><img src="images/speakersHEY/02.jpg" /></div><div><img src="images/speakersHEY/03.jpg" /></div><div><img src="images/speakersHEY/04.jpg" /></div><div><img src="images/speakersHEY/05.jpg" /></div><div><img src="images/speakersHEY/06.jpg" /></div><div><img src="images/speakersHEY/07.jpg" /></section></div>';
  var allElsOne = document.querySelectorAll('.vis-spectrum i');
  var totalElsOne = allElsOne.length;
  var allElsTwo = document.querySelectorAll('.vis-speakers div');
  var totalElsTwo = allElsTwo.length;
  var screenOne = document.querySelector('.vis-spectrum');
  var screenTwo = document.querySelector('.vis-speakers');
  screenTwo.style.opacity = 0;

  animateDom = function() {
    for (let i=0; i<totalElsOne; i++) {
      //style i
      allElsOne[i].style.backgroundColor = 'hsla('+i*20+',50%,50%,0.9)';
      allElsOne[i].style.border = '1px solid hsla('+i*20+',50%,50%,1)';

      var freqVol = newFreqData[i*2]/4;
      allElsOne[i].style.height = freqVol+'vh';
    }
    for (let i=0; i<totalElsTwo; i++) {
      //style i
      allElsTwo[i].style.backgroundColor = 'hsla('+i*40+',30%,50%,1)';

      var freqOp = (newFreqData[i*3]/255)+0.1;
      allElsTwo[i].style.opacity = freqOp;
      allElsTwo[i].style.filter = 'contrast('+(freqOp+1)+')';
    }

    if (data[0] === 176) {
      screenTwo.style.opacity = (data[2]/127);
      screenOne.style.opacity = 1-(data[2]/127);
    }

    if (data[0] === 144 && data[1] === 4) {
      if (data[2] === 64) {
        screenOne.style.background = 'white';
        screenTwo.style.background = 'white';
      } else if (data[2] === 0) {
        screenOne.style.background = 'transparent';
        screenTwo.style.background = 'transparent';
      }
    }
  }
}, false);

// bridget squares
Reveal.addEventListener( 'vis_bridget_squares', function(ev) {
  screen.style.display = 'block';
  currentAnimation = ev.type;

// 16
  screen.innerHTML = '<section class="vis-bridget-squares"><section></section><section></section><section></section><section></section><section></section><section></section><section></section><section></section><section></section><section></section><section></section><section></section><section></section><section></section><section></section><section></section></section>';
  allEls = document.querySelectorAll('.vis-bridget-squares section');
  totalEls = allEls.length;

  animateDom = function() {
    for (let i=0; i<totalEls; i++) {

      var freqVol = newFreqData[i*2];

      if (freqVol <= 255 && freqVol > 150) {
        allEls[i].style.flex = 2;
      } else if (freqVol <= 150 && freqVol > 90) {
        allEls[i].style.flex = 1.5;
      } else if (freqVol <= 90 && freqVol > 40) {
        allEls[i].style.flex = 0.5;
      } else { //50 or below
        allEls[i].style.flex = 1;      
      }
    }
  }
}, false);

// bridget squares
Reveal.addEventListener( 'vis_bridget_tri', function(ev) {
  screen.style.display = 'block';
  currentAnimation = ev.type;

// 16
  screen.innerHTML = '<section class="vis-bridget-tri"><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b></section>';
  allEls = document.querySelectorAll('.vis-bridget-tri b');
  totalEls = allEls.length;

  animateDom = function() {
    for (let i=0; i<totalEls; i++) {
      var freqVol = newFreqData[i*2];

      if (freqVol > 50) {
        allEls[i].style.opacity = freqVol/150;
      } else {
        allEls[i].style.opacity = 0;
      }
    }
  }
}, false);

function createQuarter(fragment, screen) {

  // create a new 'quarter', set styles
  let quarterEl = document.createElement('div');
  quarterEl.classList = 'quarter';
  quarterEl.style.width = '50vw';
  quarterEl.style.height = '50vh';
  quarterEl.style.overflow = 'hidden';

  // duplicate original fragment to be mirrored in quarter
  let newHtml = fragment.outerHTML+fragment.outerHTML;
  quarterEl.innerHTML = newHtml;
  screen.removeChild(fragment);
  screen.appendChild(quarterEl);

  // rotate and set styles on new fragments within quarter
  let newFragments = document.querySelectorAll('.quarter '+fragment.localName);
  for (let i = newFragments.length - 1; i >= 0; i--) {
    newFragments[i].style.width = '50vw';
    newFragments[i].style.height = '50vh';
  }
  newFragments[1].style.transform = 'translateY(-50vh) rotateZ(180deg)';

  // rotate quarter
  for (var i=3-1; i>=0; i--) {
    let nextQuarter = quarterEl.cloneNode(true);
    screen.appendChild(nextQuarter);
  }
  const allQuarters = document.querySelectorAll('.quarter');
  for (var i=allQuarters.length-1; i>0; i--) {
    allQuarters[i].style.transform = 'translateY('+i*-50+'vh) rotateZ('+i*90+'deg)';
    allQuarters[i].style.transformOrigin = 'right bottom';
  }
  
}

// symmetry
Reveal.addEventListener( 'vis_symmetry', function(ev) {
  screen.style.display = 'block';
  currentAnimation = ev.type;

  screen.innerHTML = '<section class="vis-symmetry"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></section>';
  
  // set which element to be symmetry'd
  const fragmentedSection = document.querySelector('.vis-symmetry');

  createQuarter(fragmentedSection, screen);

  animateDom = function() {
    document.documentElement.style.setProperty('--level', newFreqData[5]/220);
  }
}, false);
// symmetry gif
Reveal.addEventListener( 'vis_symmetry_gif', function(ev) {
  screen.style.display = 'block';
  currentAnimation = ev.type;

  screen.innerHTML = '<section class="vis-symmetry-gif"><img src="images/explode.gif" /></section>';
  
  // set which element to be symmetry'd
  const fragmentedSection = document.querySelector('.vis-symmetry-gif');

  createQuarter(fragmentedSection, screen);

  animateDom = function() {
    document.documentElement.style.setProperty('--level', newFreqData[5]/220);
  }
}, false);

// sunburst
Reveal.addEventListener( 'vis_sunburst', function(ev) {
  screen.style.display = 'block';
  currentAnimation = ev.type;

  screen.innerHTML = '<section class="vis-sunburst"><svg></svg></section>';
  
  var width = window.innerWidth,
    height = window.innerHeight,
    radius = Math.min(width, height) / 2;

  var svg = d3.select("svg")
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height * .52 + ")");
  var g = d3.select("g");
  var arcs = g.selectAll("path");

  var arc = d3.svg.arc()
    .startAngle(function(d, i) { return (i/8)*Math.PI; })
    .endAngle(function(d, i) { return ((i+1)/8)*Math.PI; })
    .innerRadius(function(d, i) { return radius/3; })
    .outerRadius(function(d, i) { return d*2; });

// 32
  animateDom = function() {
    arcs = arcs.data(newFreqData);

    arcs
      .enter().append("path")
      .style("stroke", "#fff");

    arcs
      .attr("d", arc)
      .style("fill", function(d,i) { return 'hsla('+i*6+',60%,'+Math.floor(d/2.5)+'%,'+d/255+')'; })
      .exit().remove();
  }
}, false);

// spiral
Reveal.addEventListener( 'vis_spiral', function(ev) {
  screen.style.display = 'block';
  currentAnimation = ev.type;

  screen.innerHTML = '<section class="vis-spiral"><svg></svg></section>';
  
  var width = window.innerWidth,
    height = window.innerHeight,
    radius = Math.min(width, height) / 2;

  var svg = d3.select("svg")
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height * .52 + ")");
  var g = d3.select("g");
  var arcs = g.selectAll("path");

  var arc = d3.svg.arc()
    .startAngle(function(d, i) { return (i/8)*Math.PI; })
    .endAngle(function(d, i) { return ((i+1)/8)*Math.PI; })
    .innerRadius(function(d, i) { return 0; })
    .outerRadius(function(d, i) { return (i*15)+(d); });

// 32
  animateDom = function() {
    arcs = arcs.data(newFreqData);

    arcs
      .enter().append("path")
      .style("stroke", "#222");

    arcs
      .attr("d", arc)
      .style("fill", function(d,i) { return 'hsla('+i*6+',60%,'+Math.floor(d/2.5)+'%,'+d/255+')'; })
      .exit().remove();
  }
}, false);

// spots
Reveal.addEventListener( 'vis_spots', function(ev) {
  screen.style.display = 'block';
  currentAnimation = ev.type;

  screen.innerHTML = '<section class="vis-spots"><svg></svg></section>';
  
  var svg = d3.select('svg');
  var circle = svg.selectAll('circle'),
    line = svg.selectAll('line'),
    radius = window.innerHeight/2.5-50;


// 24
  animateDom = function() {
    circle = circle.data(newFreqData.slice(0,24));
  
    circle
      .enter().append('circle')
      .attr("cy", function(d, i) {
        // return Math.round( () + (i*Math.random) );
        return Math.round(window.innerHeight*Math.random());
      })
      .attr("cx", function(d, i) {
        // return Math.round( () + (i*Math.random) );
        return Math.round(window.innerWidth*Math.random());
      });
    
    circle
      .attr("r", function(d, i) { return (d); })
      .attr("fill", function(d,i) {return "hsla("+Math.round( i*(20+(d/255)) )+",50%,60%,0.7)"} )
      .attr("stroke","white")
      .exit().remove();
    }

}, false);

// spots blend
Reveal.addEventListener( 'vis_spots_blend', function(ev) {
  screen.style.display = 'block';
  currentAnimation = ev.type;

  screen.innerHTML = '<section class="vis-spots-blend"><svg></svg></section>';
  
  var svg = d3.select('svg');
  var circle = svg.selectAll('circle'),
    line = svg.selectAll('line'),
    radius = window.innerHeight/2.5-50;

// 24
  animateDom = function() {
    circle = circle.data(newFreqData.slice(0,24));
  
    circle
      .enter().append('circle')
      .attr("cy", function(d, i) {
        // return Math.round( () + (i*Math.random) );
        return Math.round(window.innerHeight*Math.random());
      })
      .attr("cx", function(d, i) {
        // return Math.round( () + (i*Math.random) );
        return Math.round(window.innerWidth*Math.random());
      });
    
    circle
      .attr("r", function(d, i) { return (d); })
      .attr("fill", function(d,i) {return "hsla("+Math.round( i*(20+(d/255)) )+",50%,60%,0.7)"} )
      .attr("stroke","white")
      .exit().remove();
    }
      
}, false);


// chart
Reveal.addEventListener( 'vis_chart', function(ev) {
  screen.style.display = 'block';
  currentAnimation = ev.type;

  screen.innerHTML = '<section class="vis-chart"><svg></svg></section>';
  
  var svg = d3.select('svg');
    svg.append('text')
      .text('Music: Screw Up by @kinnoha')
      .attr('fill', 'white')
      .attr('x', 20)
      .attr('y', 30)
      .style('font-family', 'sans-serif')
      .style('font-size', '1.2em');
  var circle = svg.selectAll('circle'),
    line = svg.selectAll('line'),
    radius = window.innerHeight/2.5-50;

  var moreNewData;

  animateDom = function() {

    moreNewData = frequencyData.filter(function(el,i){return i%256===0})

    circle = circle.data(moreNewData);
  
    circle
      .enter().append('circle')
      .attr("cy", function(d, i) {
        return Math.round(window.innerHeight/2 + (radius*Math.sin((2*i*Math.PI)/16)) );
      })
      .attr("cx", function(d, i) {
        return Math.round(window.innerWidth/2 + (radius*Math.cos((2*i*Math.PI)/16)) );
      });
    
    circle
      .attr("r", function(d) { return d/2; })
      .attr("fill", "hsla(200,50%,80%,0.7)")
      .exit().remove();

    line = line.data(moreNewData);

    line
      .enter().append('line')
      .attr("x1", function(d, i) {
        return Math.round(window.innerWidth/2 + (radius*Math.cos((2*i*Math.PI)/16)) );
      })
      .attr("y1", function(d, i) {
        return Math.round(window.innerHeight/2 + (radius*Math.sin((2*i*Math.PI)/16)) );
      })
      .attr("stroke-width","3")
      .attr("stroke","hsla(320,60%,50%,0.9)");
    line
      .attr("x2",function(d, i) {
        return Math.round(window.innerWidth/2 + ( (radius-d)*Math.cos((2*i*Math.PI)/16)) );
      })
      .attr("y2",function(d, i) {
        return Math.round(window.innerHeight/2 + ( (radius-d)*Math.sin((2*i*Math.PI)/16)) );
      })
      .exit().remove();
  }
      
}, false);

// chart
Reveal.addEventListener( 'vis_chart_better', function(ev) {
  screen.style.display = 'block';
  currentAnimation = ev.type;

  screen.innerHTML = '<section class="vis-chart-better"><svg></svg></section>';
  
  var svg = d3.select('svg');
    svg.append('text')
      .text('Music: Screw Up by @kinnoha')
      .attr('fill', 'white')
      .attr('x', 20)
      .attr('y', 30)
      .style('font-family', 'sans-serif')
      .style('font-size', '1.2em');
  var circle = svg.selectAll('circle'),
    line = svg.selectAll('line'),
    radius = window.innerHeight/2.5-50;


  animateDom = function() {

    moreNewDataAg = newFreqData.filter(function(el,i){return i%2===0})

    circle = circle.data(moreNewDataAg);
  
    circle
      .enter().append('circle')
      .attr("cy", function(d, i) {
        return Math.round(window.innerHeight/2 + (radius*Math.sin((2*i*Math.PI)/16)) );
      })
      .attr("cx", function(d, i) {
        return Math.round(window.innerWidth/2 + (radius*Math.cos((2*i*Math.PI)/16)) );
      });
    
    circle
      .attr("r", function(d) { return d/2; })
      .attr("fill", "hsla(200,50%,80%,0.7)")
      .exit().remove();

    line = line.data(moreNewDataAg);

    line
      .enter().append('line')
      .attr("x1", function(d, i) {
        return Math.round(window.innerWidth/2 + (radius*Math.cos((2*i*Math.PI)/16)) );
      })
      .attr("y1", function(d, i) {
        return Math.round(window.innerHeight/2 + (radius*Math.sin((2*i*Math.PI)/16)) );
      })
      .attr("stroke-width","3")
      .attr("stroke","hsla(320,60%,50%,0.9)");
    line
      .attr("x2",function(d, i) {
        return Math.round(window.innerWidth/2 + ( (radius-d)*Math.cos((2*i*Math.PI)/16)) );
      })
      .attr("y2",function(d, i) {
        return Math.round(window.innerHeight/2 + ( (radius-d)*Math.sin((2*i*Math.PI)/16)) );
      })
      .exit().remove();
  }
      
}, false);




Reveal.addEventListener( 'no-visuals', function() {
  screen.style.display = 'none';
}, false);
