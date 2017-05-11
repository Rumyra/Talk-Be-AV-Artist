navigator.serviceWorker.getRegistrations().then(function(registrations) {
 for(let registration of registrations) {
  registration.unregister()
} });

const jsConfCols = {
  blue: {hue: 234, sat: 96, light: 44},
  dPink: {hue: 328, sat: 100, light: 44},
  lPink: {hue: 325, sat: 55, light: 76},
  denim: {hue: 222, sat: 41, light: 50}
};

const screenVals = {
    width: window.innerWidth,
    height: window.innerHeight,
    maxRadius: (window.innerHeight-(window.innerWidth/6))/2,
    minRadius: (window.innerHeight/10)/2
  };

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
  screen = document.getElementById('screen'),
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

  screen.innerHTML = '<div id="two-screens"><section class="vis-spectrum"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></section><section class="vis-speakers"><img src="images/jsconfBk.jpg" style="width:100%;height:auto;" /></section></div>';
  var allElsOne = document.querySelectorAll('.vis-spectrum i');
  var totalElsOne = allElsOne.length;
  // var allElsTwo = document.querySelectorAll('.vis-speakers div');
  // var totalElsTwo = allElsTwo.length;
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
    // for (let i=0; i<totalElsTwo; i++) {
    //   //style i
    //   allElsTwo[i].style.backgroundColor = 'hsla('+i*40+',30%,50%,1)';

    //   var freqOp = (newFreqData[i*3]/255)+0.1;
    //   allElsTwo[i].style.opacity = freqOp;
    //   allElsTwo[i].style.filter = 'contrast('+(freqOp+1)+')';
    // }

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
        allEls[i].style.opacity = freqVol/64;
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
    document.documentElement.style.setProperty('--level', newFreqData[10]/64);
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

// diagonal circles
Reveal.addEventListener( 'vis_diagonalCirc', function(ev) {
  screen.style.display = 'block';
  currentAnimation = ev.type;

  screen.innerHTML = '<section class="vis-diagonalCirc"><svg></svg></section>';
  
  var svg = d3.select('svg'),
    shape = svg.selectAll('circle');

// 24
  animateDom = function() {
    shape = shape.data(newFreqData.slice(0,16));
  
    shape
    .enter().append('circle')
    .attr("cy", function(d, i) {
      // return Math.round( (window.innerHeight/2) + (i*Math.random) );
      return 50*i;
    })
    .attr("cx", function(d, i) {
      // return Math.round( (window.innerWidth/2) + (i*Math.random) );
      return 90*i;
    });
  
  shape
    .attr("r", function(d, i) { return (d/2)*i/2; })
    .attr("fill", function(d,i) {return "hsla("+Math.round( i*(20+(d/255)) )+",50%,80%,0.5)"} )
    .exit().remove();
  }

      
}, false);

// concentric
Reveal.addEventListener( 'vis_concentric', function(ev) {
  screen.style.display = 'block';
  currentAnimation = ev.type;

  screen.innerHTML = '<section class="vis-concentric"><svg></svg></section>';
  
  var svg = d3.select('svg'),
    shape = svg.selectAll('path');

  var conArc = d3.svg.arc()
  .startAngle(0)
  .endAngle(function(d, i) { return d/32; })
  .innerRadius(function(d, i) { return i*32; })
  .outerRadius(function(d, i) { return (i+1)*24; });

// 24
  animateDom = function() {
    shape = shape.data(newFreqData.slice(0,16));
  
    shape
    .enter().append("path")
    .attr("transform", "translate(" + screenVals.width / 2 + "," + screenVals.height * .52 + ")")
    .style("stroke", "#222");

  shape
    .attr("d", conArc)
    .style("fill", function(d,i) { return 'hsla('+i*16+',60%,60%,'+d/255+')'; })
    .exit().remove();
  }
      
}, false);

// super chart
Reveal.addEventListener( 'vis_supChart', function(ev) {
  screen.style.display = 'block';
  currentAnimation = ev.type;

  screen.innerHTML = '<section class="vis-supChart"><svg></svg></section>';
  
  var svg = d3.select('svg');
  var shape = svg.selectAll('circle'),
    shape2 = svg.selectAll('line');

// 24
  animateDom = function() {
    shape = shape.data(newFreqData.slice(0,16));
  
  shape
    .enter().append('circle')
    .attr("cy", function(d, i) {
      return Math.round(window.innerHeight/2 + (screenVals.maxRadius*Math.sin((2*i*Math.PI)/16)) );
    })
    .attr("cx", function(d, i) {
      return Math.round(window.innerWidth/2 + (screenVals.maxRadius*Math.cos((2*i*Math.PI)/16)) );
    });
  
  shape
    .attr("r", function(d) { return d/2; })
    .attr("fill", function(d,i) {return "hsla("+Math.round( i*(20+(d/255)) )+",50%,80%,0.8)"})
    .exit().remove();

    shape2 = shape2.data(newFreqData.slice(0,16));

  shape2
    .enter().append('line')
    .attr("x1", function(d, i) {
      return Math.round(window.innerWidth/2 + (screenVals.maxRadius*Math.cos((2*i*Math.PI)/16)) );
    })
    .attr("y1", function(d, i) {
      return Math.round(window.innerHeight/2 + (screenVals.maxRadius*Math.sin((2*i*Math.PI)/16)) );
    })
    .attr("stroke-width","2")
    .attr("stroke","hsla(320,60%,100%,0.9)");
  shape2
    .attr("x2",function(d, i) {
      return Math.round(window.innerWidth/2 + ( (screenVals.maxRadius-d)*Math.cos((2*i*Math.PI)/16)) );
    })
    .attr("y2",function(d, i) {
      return Math.round(window.innerHeight/2 + ( (screenVals.maxRadius-d)*Math.sin((2*i*Math.PI)/16)) );
    })
    .exit().remove();

  }
      
}, false);

// super Chart before
Reveal.addEventListener( 'vis_supChart_before', function(ev) {
  screen.style.display = 'block';
  currentAnimation = ev.type;

  screen.innerHTML = '<section class="vis-supChart"><svg></svg></section>';
  
  var svg = d3.select('svg');
  var shape = svg.selectAll('circle'),
    shape2 = svg.selectAll('line');

// 24
  animateDom = function() {
    shape = shape.data(newFreqData.slice(0,16));
  
  shape
    .enter().append('circle')
    .attr("cy", function(d, i) {
      return Math.round(window.innerHeight/2 + (screenVals.maxRadius*Math.sin((2*i*Math.PI)/16)) );
    })
    .attr("cx", function(d, i) {
      return Math.round(window.innerWidth/2 + (screenVals.maxRadius*Math.cos((2*i*Math.PI)/16)) );
    });
  
  shape
    .attr("r", function(d, i) { return (d/2)*( (16-i)/10 ); })
    .attr("fill", function(d,i) {return "hsla("+Math.round( i*(20+(d/255)) )+",50%,80%,0.8)"})
    .exit().remove();

    shape2 = shape2.data(newFreqData.slice(0,16));

  shape2
    .enter().append('line')
    .attr("x1", function(d, i) {
      return Math.round(window.innerWidth/2 + (screenVals.maxRadius*Math.cos((2*i*Math.PI)/16)) );
    })
    .attr("y1", function(d, i) {
      return Math.round(window.innerHeight/2 + (screenVals.maxRadius*Math.sin((2*i*Math.PI)/16)) );
    })
    .attr("stroke-width","2")
    .attr("stroke","hsla(320,60%,100%,0.9)");
  shape2
    .attr("x2",function(d, i) {
      return Math.round(window.innerWidth/2 + ( (screenVals.maxRadius-d)*Math.cos((2*i*Math.PI)/16)) );
    })
    .attr("y2",function(d, i) {
      return Math.round(window.innerHeight/2 + ( (screenVals.maxRadius-d)*Math.sin((2*i*Math.PI)/16)) );
    })
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

// jsconf
Reveal.addEventListener( 'vis_jsconf', function(ev) {
  screen.style.display = 'block';
  currentAnimation = ev.type;

  screen.innerHTML = "<section class=\"vis-jsconf\"><svg><defs><g id=\"jsConfLogoTwo\"><path class=\"st0\" d=\"M50.5,104.8c0,10.3-0.1,15.4-8,23.2c-3.2,3.2-5,4.1-6.9,4.1c-4,0-6.9-3.6-6.9-6.5c0-2.7,2.5-3.9,4.3-5.8 c4-4,4-8.8,4-15.1V72.9c0-2.4,0-4,1-5.3c1-1.4,2.8-1.9,5.7-1.9c2.9,0,4.7,0.6,5.7,1.9c1,1.4,1,3,1,5.3V104.8z\"/><path class=\"st0\" d=\"M87.1,90.7c4.5,3,8.4,7.1,8.4,14.2c0,10.7-9,16.8-19.7,16.8c-3.8,0-8-0.8-11.5-2.5c-2.7-1.4-4.9-3.1-4.9-6.1 c0-2.8,2-6.4,5.3-6.4c3.4,0,6,3.9,11.2,3.9c3.7,0,6.3-1.9,6.3-5c0-3.3-3-5.2-6.8-7.1c-6.4-3.3-15.2-7.3-15.2-17.3 c0-9.8,8.5-16.1,19-16.1c7.4,0,15.4,3.2,15.4,8.2c0,2.7-2.4,6.2-5.6,6.2c-3,0-5.8-3.1-10.1-3.1c-3.3,0-5.3,1.8-5.3,4.1 C73.5,84.8,81.1,86.8,87.1,90.7z\"/><path class=\"st0\" d=\"M128.9,109.7c2.3,0,4.3-0.4,6.4-1.3c2.5-1,4.1-2.2,5.9-2.2c3.5,0,5.3,4.1,5.3,6.7c0,2.1-1.4,3.9-3.8,5.4 c-3.9,2.4-9.6,3.5-14.6,3.5c-15.5,0-27.7-10.4-27.7-28.4c0-19,13.4-28.4,27.9-28.4c5.3,0,10.9,1.3,14.4,3.4 c2.6,1.6,3.8,3.4,3.8,5.5c0,2.6-1.8,6.8-5.3,6.8c-1.9,0-3.6-1.1-6.3-2.2c-2.1-0.8-4.2-1.4-6.7-1.4c-7.4,0-14.2,4.8-14.2,16 C114.1,104.6,121.2,109.7,128.9,109.7z\"/><path class=\"st0\" d=\"M180,64.8c17.8,0,28.9,12.1,28.9,28.4c0,16.6-11.5,28.7-29.2,28.7c-17.8,0-28.9-12.1-28.9-28.4 C150.8,76.9,162.3,64.8,180,64.8z M179.9,110.5c9.5,0,15.5-6.3,15.5-17.1c0-10.9-6.1-17.2-15.6-17.2s-15.5,6.3-15.5,17.1 C164.4,104.3,170.5,110.5,179.9,110.5z\"/><path class=\"st0\" d=\"M230.9,114c0,2.4,0,3.9-1,5.2c-1,1.3-2.6,2-5.4,2c-2.9,0-4.5-0.8-5.5-2c-1-1.4-1-3-1-5.2V70.8 c0-3.2,2.3-5.2,7-5.2c4.9,0,6.8,2.1,9,5l21.8,28.6V72.9c0-2.4,0-3.9,1-5.2c1-1.3,2.6-2,5.4-2c2.9,0,4.5,0.8,5.5,2 c1,1.4,1,2.9,1,5.2v43.3c0,3.6-2.3,5.3-6.2,5.3c-4.1,0-6-1.9-8.3-4.8l-23.4-29.9V114z\"/><path class=\"st0\" d=\"M294.2,114c0,2.3,0,3.9-1,5.2s-2.7,2-5.5,2c-2.8,0-4.6-0.7-5.6-2s-1-3-1-5.2V72.3c0-4.4,1.8-6.1,6.3-6.1h19.6 c2.3,0,3.8,0,5.2,0.9c1.3,0.9,2,2.5,2,5c0,2.6-0.8,4.1-2,5.1c-1.4,0.9-2.9,0.9-5.2,0.9h-12.7v9.8h10.3c2.3,0,3.8,0,5.2,0.9 c1.3,0.9,2,2.4,2,4.9c0,2.6-0.8,4.1-2,5c-1.4,0.9-2.9,0.9-5.2,0.9h-10.3V114z\"/><path class=\"st0\" d=\"M320.7,121.5c-4.6,0-7.5-3-7.5-7.5c0-4.5,3-7.5,7.5-7.5c4.6,0,7.5,3,7.5,7.5 C328.2,118.6,325.2,121.5,320.7,121.5z\"/><path class=\"st0\" d=\"M351.1,86.4h9.2c2.3,0,3.9,0,5.2,0.8c1,0.7,2,2.1,2,4.8s-1,4.1-2,4.8c-1.3,0.8-2.9,0.8-5.2,0.8h-9.2v11.8 h14.1c2.3,0,3.9,0,5.2,0.8c1,0.7,2,2.1,2,4.8c0,2.7-1,4.1-2,4.8c-1.3,0.8-2.9,0.8-5.2,0.8h-20.7c-4.6,0-6.3-1.8-6.3-6.3V72.4 c0-4.6,1.7-6.3,6.3-6.3h19c2.3,0,3.9,0,5.2,0.8c1,0.7,2,2.1,2,4.8s-1,4.1-2,4.8c-1.3,0.8-2.9,0.8-5.2,0.8h-12.4V86.4z\"/> <path class=\"st0\" d=\"M413.8,107.1c2.4-2.9,2.5-6.8,2.5-9.8V72.9c0-2.4,0-4,1-5.3c1-1.4,2.7-1.9,5.6-1.9s4.6,0.6,5.6,1.9 c1,1.4,1,3,1,5.3v23.7c0,5.8,0,12.4-4.8,18c-3.6,4.2-9.6,7.3-19.7,7.3c-10.2,0-16-3.1-19.6-7.3c-4.9-5.8-4.9-12.1-4.9-18.1V72.9 c0-2.4,0-4,1-5.3c1-1.4,2.8-1.9,5.7-1.9c2.9,0,4.7,0.6,5.7,1.9c1,1.4,1,3,1,5.3v24.4c0,3,0,6.9,2.4,9.8c1.8,2.1,4.7,3.4,8.9,3.4 C409.2,110.5,412,109.2,413.8,107.1z\"/><path d=\"M535.1,38h-78.6c-1.7,0-3,1.3-3,3v78.6c0,1.7,1.3,3,3,3h78.6c1.7,0,3-1.3,3-3V41C538.1,39.4,536.8,38,535.1,38z M521.2,97.8c-5.1,5.1-13.2,13.2-14.6,14.6c-1.4-1.4-9.5-9.5-14.6-14.6c-4.5-4.5-4.4-11.2-0.3-15.3c4.1-4.1,10.8-4.1,14.9,0 c4.1-4.1,10.8-4.1,14.9,0C525.6,86.6,525.7,93.2,521.2,97.8z\"/></g></defs></svg></section>'";
  
  var width = window.innerWidth,
    height = window.innerHeight,
    radius = Math.min(width, height) / 2;

  var svg = d3.select('svg');
  var shape = svg.selectAll('circle'),
    shape2 = svg.selectAll('rect.one'),
    shape3 = svg.selectAll('rect.two'),
    logo = svg.selectAll('use');

// 32
  animateDom = function() {
    shape = shape.data(newFreqData);

  shape
    .enter().append('circle')
    .attr("cy", function(d, i) {
      return Math.round( screenVals.height*Math.random() );
    })
    .attr("cx", function(d, i) {
      return Math.round( screenVals.width*Math.random() );
    });
    
  shape
    .attr("r", function(d, i) { return d/4; })
    .attr("fill", function(d,i) {
      if (d<50) {
        return "hsla("+jsConfCols.blue.hue+", "+jsConfCols.blue.sat+"%, "+jsConfCols.blue.light+"%, 1)";
      } else if (d<100) {
        return "hsla("+jsConfCols.dPink.hue+", "+jsConfCols.dPink.sat+"%, "+jsConfCols.dPink.light+"%, 1)";
      } else if (d<150) {
        return "hsla("+jsConfCols.lPink.hue+", "+jsConfCols.lPink.sat+"%, "+jsConfCols.lPink.light+"%, 1)";
      } else if (d<200) {
        return "hsla("+jsConfCols.denim.hue+", "+jsConfCols.denim.sat+"%, "+jsConfCols.denim.light+"%, 1)";
      } else {
        return "hsla("+jsConfCols.denim.hue+", 0%, 100%, 1)";
      }
    })
    .exit().remove();

  shape2 = shape2.data(newFreqData);

  shape2
    .enter().append('rect').attr('class', 'one')
    .attr("x", function(d, i) {
      return Math.round( (screenVals.width*Math.random()) );
    })
    .attr("y", function(d, i) {
      return Math.round( (screenVals.height*Math.random()) );
    })
    ;

  shape2
    .attr("width",function(d, i) {
      return i*10;
    })
    .attr("height",function(d, i) {
      return i*25;
    })
    .attr('style', function(d,i) {
      return 'transform:rotate('+i*10+'deg) scale('+((d/255)+1)+');';
    } )
    .attr("fill", function(d,i) {
      if (d<50) {
        return "hsla("+jsConfCols.dPink.hue+", "+jsConfCols.dPink.sat+"%, "+jsConfCols.dPink.light+"%, 1)";
      } else if (d<100) {
        return "hsla("+jsConfCols.lPink.hue+", "+jsConfCols.lPink.sat+"%, "+jsConfCols.lPink.light+"%, 1)";
      } else if (d<150) {
        return "hsla("+jsConfCols.denim.hue+", "+jsConfCols.denim.sat+"%, "+jsConfCols.denim.light+"%, 1)";
      } else if (d<200) {
        return "hsla("+jsConfCols.blue.hue+", "+jsConfCols.blue.sat+"%, "+jsConfCols.blue.light+"%, 1)";
      } else {
        return "hsla("+jsConfCols.denim.hue+", 0%, 100%, 1)";
      }
    })
    .exit().remove();

  shape3 = shape3.data(newFreqData);

  shape3
    .enter().append('rect').attr('class', 'two')
    .attr('rx', 8).attr('ry', 8)
    .attr("x", function(d, i) {
      return Math.round( (screenVals.width*Math.random()) );
    })
    .attr("y", function(d, i) {
      return Math.round( (screenVals.height*Math.random()) );
    });

  shape3
    .attr("width",function(d, i) {
      return i*10;
    })
    .attr("height",function(d, i) {
      return i*10;
    })
    .attr('style', function(d,i) {
      return 'transform:scale('+((d/255)+1)+');';
    } )
    .attr("fill", function(d,i) {
      if (d<50) {
        return "hsla("+jsConfCols.denim.hue+", "+jsConfCols.denim.sat+"%, "+jsConfCols.denim.light+"%, 1)";
      } else if (d<100) {
        return "hsla("+jsConfCols.blue.hue+", "+jsConfCols.blue.sat+"%, "+jsConfCols.blue.light+"%, 1)";
      } else if (d<150) {
        return "hsla("+jsConfCols.dPink.hue+", "+jsConfCols.dPink.sat+"%, "+jsConfCols.dPink.light+"%, 1)";
      } else if (d<200) {
        return "hsla("+jsConfCols.lPink.hue+", "+jsConfCols.lPink.sat+"%, "+jsConfCols.lPink.light+"%, 1)";
      } else {
        return "hsla("+jsConfCols.denim.hue+", 0%, 100%, 1)";
      }
    })
    .exit().remove();

  logo = logo.data(newFreqData.filter(function(el,i){return i%9===0}));

  logo
    .enter().append('use').attr('href','#jsConfLogoTwo')
    .style("transform", function(d, i) {
      return "translate("+(screenVals.width/2-100)+"px, "+(screenVals.height/2-20)+"px)";
    })
    .attr("stroke", "white");

  logo
    .attr("stroke-width", function(d, i) { return (d/25); })
    .attr("fill", function(d,i) {return "hsla("+i*10+",60%,70%,"+d/255+")"} )
    .exit().remove();
  }
}, false);

Reveal.addEventListener( 'vis_jsconf_blend', function(ev) {
  screen.style.display = 'block';
  currentAnimation = ev.type;

  screen.innerHTML = "<section class=\"vis-jsconf\"><svg><defs><g id=\"jsConfLogoTwo\"><path class=\"st0\" d=\"M50.5,104.8c0,10.3-0.1,15.4-8,23.2c-3.2,3.2-5,4.1-6.9,4.1c-4,0-6.9-3.6-6.9-6.5c0-2.7,2.5-3.9,4.3-5.8 c4-4,4-8.8,4-15.1V72.9c0-2.4,0-4,1-5.3c1-1.4,2.8-1.9,5.7-1.9c2.9,0,4.7,0.6,5.7,1.9c1,1.4,1,3,1,5.3V104.8z\"/><path class=\"st0\" d=\"M87.1,90.7c4.5,3,8.4,7.1,8.4,14.2c0,10.7-9,16.8-19.7,16.8c-3.8,0-8-0.8-11.5-2.5c-2.7-1.4-4.9-3.1-4.9-6.1 c0-2.8,2-6.4,5.3-6.4c3.4,0,6,3.9,11.2,3.9c3.7,0,6.3-1.9,6.3-5c0-3.3-3-5.2-6.8-7.1c-6.4-3.3-15.2-7.3-15.2-17.3 c0-9.8,8.5-16.1,19-16.1c7.4,0,15.4,3.2,15.4,8.2c0,2.7-2.4,6.2-5.6,6.2c-3,0-5.8-3.1-10.1-3.1c-3.3,0-5.3,1.8-5.3,4.1 C73.5,84.8,81.1,86.8,87.1,90.7z\"/><path class=\"st0\" d=\"M128.9,109.7c2.3,0,4.3-0.4,6.4-1.3c2.5-1,4.1-2.2,5.9-2.2c3.5,0,5.3,4.1,5.3,6.7c0,2.1-1.4,3.9-3.8,5.4 c-3.9,2.4-9.6,3.5-14.6,3.5c-15.5,0-27.7-10.4-27.7-28.4c0-19,13.4-28.4,27.9-28.4c5.3,0,10.9,1.3,14.4,3.4 c2.6,1.6,3.8,3.4,3.8,5.5c0,2.6-1.8,6.8-5.3,6.8c-1.9,0-3.6-1.1-6.3-2.2c-2.1-0.8-4.2-1.4-6.7-1.4c-7.4,0-14.2,4.8-14.2,16 C114.1,104.6,121.2,109.7,128.9,109.7z\"/><path class=\"st0\" d=\"M180,64.8c17.8,0,28.9,12.1,28.9,28.4c0,16.6-11.5,28.7-29.2,28.7c-17.8,0-28.9-12.1-28.9-28.4 C150.8,76.9,162.3,64.8,180,64.8z M179.9,110.5c9.5,0,15.5-6.3,15.5-17.1c0-10.9-6.1-17.2-15.6-17.2s-15.5,6.3-15.5,17.1 C164.4,104.3,170.5,110.5,179.9,110.5z\"/><path class=\"st0\" d=\"M230.9,114c0,2.4,0,3.9-1,5.2c-1,1.3-2.6,2-5.4,2c-2.9,0-4.5-0.8-5.5-2c-1-1.4-1-3-1-5.2V70.8 c0-3.2,2.3-5.2,7-5.2c4.9,0,6.8,2.1,9,5l21.8,28.6V72.9c0-2.4,0-3.9,1-5.2c1-1.3,2.6-2,5.4-2c2.9,0,4.5,0.8,5.5,2 c1,1.4,1,2.9,1,5.2v43.3c0,3.6-2.3,5.3-6.2,5.3c-4.1,0-6-1.9-8.3-4.8l-23.4-29.9V114z\"/><path class=\"st0\" d=\"M294.2,114c0,2.3,0,3.9-1,5.2s-2.7,2-5.5,2c-2.8,0-4.6-0.7-5.6-2s-1-3-1-5.2V72.3c0-4.4,1.8-6.1,6.3-6.1h19.6 c2.3,0,3.8,0,5.2,0.9c1.3,0.9,2,2.5,2,5c0,2.6-0.8,4.1-2,5.1c-1.4,0.9-2.9,0.9-5.2,0.9h-12.7v9.8h10.3c2.3,0,3.8,0,5.2,0.9 c1.3,0.9,2,2.4,2,4.9c0,2.6-0.8,4.1-2,5c-1.4,0.9-2.9,0.9-5.2,0.9h-10.3V114z\"/><path class=\"st0\" d=\"M320.7,121.5c-4.6,0-7.5-3-7.5-7.5c0-4.5,3-7.5,7.5-7.5c4.6,0,7.5,3,7.5,7.5 C328.2,118.6,325.2,121.5,320.7,121.5z\"/><path class=\"st0\" d=\"M351.1,86.4h9.2c2.3,0,3.9,0,5.2,0.8c1,0.7,2,2.1,2,4.8s-1,4.1-2,4.8c-1.3,0.8-2.9,0.8-5.2,0.8h-9.2v11.8 h14.1c2.3,0,3.9,0,5.2,0.8c1,0.7,2,2.1,2,4.8c0,2.7-1,4.1-2,4.8c-1.3,0.8-2.9,0.8-5.2,0.8h-20.7c-4.6,0-6.3-1.8-6.3-6.3V72.4 c0-4.6,1.7-6.3,6.3-6.3h19c2.3,0,3.9,0,5.2,0.8c1,0.7,2,2.1,2,4.8s-1,4.1-2,4.8c-1.3,0.8-2.9,0.8-5.2,0.8h-12.4V86.4z\"/> <path class=\"st0\" d=\"M413.8,107.1c2.4-2.9,2.5-6.8,2.5-9.8V72.9c0-2.4,0-4,1-5.3c1-1.4,2.7-1.9,5.6-1.9s4.6,0.6,5.6,1.9 c1,1.4,1,3,1,5.3v23.7c0,5.8,0,12.4-4.8,18c-3.6,4.2-9.6,7.3-19.7,7.3c-10.2,0-16-3.1-19.6-7.3c-4.9-5.8-4.9-12.1-4.9-18.1V72.9 c0-2.4,0-4,1-5.3c1-1.4,2.8-1.9,5.7-1.9c2.9,0,4.7,0.6,5.7,1.9c1,1.4,1,3,1,5.3v24.4c0,3,0,6.9,2.4,9.8c1.8,2.1,4.7,3.4,8.9,3.4 C409.2,110.5,412,109.2,413.8,107.1z\"/><path d=\"M535.1,38h-78.6c-1.7,0-3,1.3-3,3v78.6c0,1.7,1.3,3,3,3h78.6c1.7,0,3-1.3,3-3V41C538.1,39.4,536.8,38,535.1,38z M521.2,97.8c-5.1,5.1-13.2,13.2-14.6,14.6c-1.4-1.4-9.5-9.5-14.6-14.6c-4.5-4.5-4.4-11.2-0.3-15.3c4.1-4.1,10.8-4.1,14.9,0 c4.1-4.1,10.8-4.1,14.9,0C525.6,86.6,525.7,93.2,521.2,97.8z\"/></g></defs></svg></section>'";
  
  var width = window.innerWidth,
    height = window.innerHeight,
    radius = Math.min(width, height) / 2;

  var svg = d3.select('svg');
  var shape = svg.selectAll('circle'),
    shape2 = svg.selectAll('rect.one'),
    shape3 = svg.selectAll('rect.two'),
    logo = svg.selectAll('use');

// 32
  animateDom = function() {
    shape = shape.data(newFreqData);

  shape
    .enter().append('circle')
    .attr("cy", function(d, i) {
      return Math.round( screenVals.height*Math.random() );
    })
    .attr("cx", function(d, i) {
      return Math.round( screenVals.width*Math.random() );
    });
    
  shape
    .attr("r", function(d, i) { return d/4; })
    .attr("fill", function(d,i) {
      if (d<50) {
        return "hsla("+jsConfCols.blue.hue+", "+jsConfCols.blue.sat+"%, "+jsConfCols.blue.light+"%, 1)";
      } else if (d<100) {
        return "hsla("+jsConfCols.dPink.hue+", "+jsConfCols.dPink.sat+"%, "+jsConfCols.dPink.light+"%, 1)";
      } else if (d<150) {
        return "hsla("+jsConfCols.lPink.hue+", "+jsConfCols.lPink.sat+"%, "+jsConfCols.lPink.light+"%, 1)";
      } else if (d<200) {
        return "hsla("+jsConfCols.denim.hue+", "+jsConfCols.denim.sat+"%, "+jsConfCols.denim.light+"%, 1)";
      } else {
        return "hsla("+jsConfCols.denim.hue+", 0%, 100%, 1)";
      }
    })
    .attr('style', function(d,i) {
      return 'mix-blend-mode: screen;';
    } )
    .exit().remove();

  shape2 = shape2.data(newFreqData);

  shape2
    .enter().append('rect').attr('class', 'one')
    .attr("x", function(d, i) {
      return Math.round( (screenVals.width*Math.random()) );
    })
    .attr("y", function(d, i) {
      return Math.round( (screenVals.height*Math.random()) );
    })
    ;

  shape2
    .attr("width",function(d, i) {
      return i*10;
    })
    .attr("height",function(d, i) {
      return i*25;
    })
    .attr('style', function(d,i) {
      return 'transform:rotate('+i*10+'deg) scale('+((d/255)+1)+');mix-blend-mode: screen;';
    } )
    .attr("fill", function(d,i) {
      if (d<50) {
        return "hsla("+jsConfCols.dPink.hue+", "+jsConfCols.dPink.sat+"%, "+jsConfCols.dPink.light+"%, 1)";
      } else if (d<100) {
        return "hsla("+jsConfCols.lPink.hue+", "+jsConfCols.lPink.sat+"%, "+jsConfCols.lPink.light+"%, 1)";
      } else if (d<150) {
        return "hsla("+jsConfCols.denim.hue+", "+jsConfCols.denim.sat+"%, "+jsConfCols.denim.light+"%, 1)";
      } else if (d<200) {
        return "hsla("+jsConfCols.blue.hue+", "+jsConfCols.blue.sat+"%, "+jsConfCols.blue.light+"%, 1)";
      } else {
        return "hsla("+jsConfCols.denim.hue+", 0%, 100%, 1)";
      }
    })
    .exit().remove();

  shape3 = shape3.data(newFreqData);

  shape3
    .enter().append('rect').attr('class', 'two')
    .attr('rx', 8).attr('ry', 8)
    .attr("x", function(d, i) {
      return Math.round( (screenVals.width*Math.random()) );
    })
    .attr("y", function(d, i) {
      return Math.round( (screenVals.height*Math.random()) );
    });

  shape3
    .attr("width",function(d, i) {
      return i*10;
    })
    .attr("height",function(d, i) {
      return i*10;
    })
    .attr('style', function(d,i) {
      return 'transform:scale('+((d/255)+1)+');mix-blend-mode: screen;';
    } )
    .attr("fill", function(d,i) {
      if (d<50) {
        return "hsla("+jsConfCols.denim.hue+", "+jsConfCols.denim.sat+"%, "+jsConfCols.denim.light+"%, 1)";
      } else if (d<100) {
        return "hsla("+jsConfCols.blue.hue+", "+jsConfCols.blue.sat+"%, "+jsConfCols.blue.light+"%, 1)";
      } else if (d<150) {
        return "hsla("+jsConfCols.dPink.hue+", "+jsConfCols.dPink.sat+"%, "+jsConfCols.dPink.light+"%, 1)";
      } else if (d<200) {
        return "hsla("+jsConfCols.lPink.hue+", "+jsConfCols.lPink.sat+"%, "+jsConfCols.lPink.light+"%, 1)";
      } else {
        return "hsla("+jsConfCols.denim.hue+", 0%, 100%, 1)";
      }
    })
    .exit().remove();

  logo = logo.data(newFreqData.filter(function(el,i){return i%9===0}));

  logo
    .enter().append('use').attr('href','#jsConfLogoTwo')
    .style("transform", function(d, i) {
      return "translate("+(screenVals.width/2-100)+"px, "+(screenVals.height/2-20)+"px)";
    })
    .attr("stroke", "white");

  logo
    .attr("stroke-width", function(d, i) { return (d/25); })
    .attr("fill", function(d,i) {return "hsla("+i*10+",60%,70%,"+d/255+")"} )
    .exit().remove();
  }
}, false);


Reveal.addEventListener( 'no-visuals', function() {
  screen.style.display = 'none';
}, false);
