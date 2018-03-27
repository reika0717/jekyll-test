var script = document.createElement('script')
script.setAttribute('src', 'https://code.jquery.com/jquery-3.2.1.min.js')
document.head.appendChild(script)

var initialize = {
	'index': function () {
		var services_array = [
			'togoWS',
			'togoTABLE',
			'togoGENOME',
			'togoDB',
			'togo_picture_gallery',
			'refEx',
			'pub_case_finder',
			'pub_annotation',
			'orefil',
			'life_science_QA',
			'inmexes',
			'ggrna',
			'dbcls_sra',
			'd2rq_mapper',
			'crispr_direct',
			'colil',
			'chip_atlas',
			'body_parts_3D',
			'aoe',
			'allie',
			'togoWS',
			'togoTABLE',
			'togoGENOME',
			'togoDB',
			'togo_picture_gallery',
			'refEx',
			'pub_case_finder',
			'pub_annotation',
			'orefil',
			'life_science_QA',
			'inmexes',
			'ggrna',
			'dbcls_sra',
			'd2rq_mapper',
			'crispr_direct',
			'colil',
			'chip_atlas',
			'body_parts_3D',
			'aoe',
			'allie'
		]
		const ROTATE_SPEED = 49000;
		const NUMBER_OF_PANEL = 20; //パネル数
		const APPEAR_PITCH = ROTATE_SPEED / NUMBER_OF_PANEL; //パネルが出現する間隔
		const currentTime = 0;
		const FPS = 30; //１秒間のコマ数
		const RADIAN_UNIT = ((Math.PI) * .1) / 1000 * FPS;//1コマの移動距離＝速さ
		const Y_UNIT = 0.00001; //y軸の速度
		const UNIT = (Math.PI * 2) / NUMBER_OF_PANEL; // 弧度
		const RADIUS = 480;　//半径

		class Panel {
			constructor () {
				var url = ''
			  $('.main-image__contents').append('<div class="panel">')
				for (let i = 0; i < services_array.length; i++) {
					url = 'img/top_assets/' + services_array[i] + '.png'
					var panel_style = {
						'background-image' : 'url(' + url + ')',
					}
				  $('.panel:nth-of-type('+ i +')').css(panel_style)		
				}
			  this.$ = $('.panel:last-child');
			  this.reset()
				$('.panel').hover(function () {
					stopTimer ()
					$('.main-image__veil, .main__forcused-page__description').css('display', 'block')
					var resized_image = $(this).css('background-image').toString()
					resized_image = resized_image.replace('.png', '_f.png')
					var forcused_style = {
						'width': '340px',
						'height': '400px',
						'position': 'absolute',
						'top': '80px',
						'left': '50%',
						'pointer-events': 'none',
						'z-index': '9999',
						'transform': 'rotateY(0) translateX(-50%)',
						'background-image': resized_image
					}

					var forcused_image = $(this).clone(true).removeClass('panel').addClass('forcused_panel').css(forcused_style)
					$('body').append(forcused_image)

				})

				$('.panel').mouseout(function () {
					startTimer()
					$('.forcused_panel').remove()
					$('.main-image__veil, .main__forcused-page__description').css('display', 'none')
				})

			}
			  
			step () {
			  function radian2degree(radian) {
			    return 180 * radian / Math.PI;
			  }
			  const currentRadius = RADIAN_UNIT * this.counter / 2 + UNIT
			    this.$.css({
			      top: (350 - (this.counter++)/2 ) + 'px',
			      left: -Math.cos(currentRadius) * RADIUS + 430 + 'px',
			      transform: 'translateY(' + Y_UNIT * this.counter / 10 + 'px) translateZ(' + (Math.sin(currentRadius) * RADIUS) + 'px) rotateY(' + (radian2degree(currentRadius) + 270) + 'deg)'
			    });
			    if (this.counter/10 > 100) {
			      stage.shift();
			      backStage.push(this);
			    }
			    let z_position = Math.sin(currentRadius) * RADIUS
			    if(z_position < 0) {
			    	var opacity = z_position * (-1)
			    	opacity = ((500 - opacity)/500) * 100
			    	opacity = Math.round(opacity)/100 + 0.2
			    	this.$.css({'opacity': opacity, 'z-index': '-100'})
			    } else if (z_position >= 0 ) {
			    	this.$.css({'opacity': 1, 'z-index': '100'})
			    }
			  }

			reset () {
			  this.counter = 0;
			  this.$.css({
			    top: '100vh',
			    left: '50vw'
			  })
			}
		}

		var stage = [], backStage = [];
		var timer;

		setInterval(function() {
		  if (backStage.length === 0) {
		    stage.push(new Panel());
		  } else {
		    var panel = backStage[0];
		    backStage.shift();
		    stage.push(panel);
		    panel.reset(); 
		  }
		}, APPEAR_PITCH);


		function animation () {
		  for (var i = 0; i < stage.length; i++) {
		    stage[i].step();
		  }
		};

		function startTimer () {
			timer = setInterval(function () {
				animation()
			}, FPS)
		}

		function stopTimer () {
			clearInterval(timer)
		}

		startTimer()
	},
	'about': function () {},
	'research': function () {},
	'services': function () {
		var repos_name = ''

		//レポジトリ一覧
		function displayReposList () {
			location.hash = 'services'
			$.get('https://api.github.com/users/dbcls/repos', function (data) {
				const repos_array = data.map(data => data.name)
				$('div.service__wrapper').empty()
				for(var i = 0; i < repos_array.length; i++){
					$('div.service__wrapper').append($('<div/>').attr({'class': 'repos_individual_wrapper'}).append('<div id="repos_name'+ i +'" class="repos_name">').append('<div id="repos_image'+ i +'" class="repos_image">'))
					$('#repos_name' + i).append('<p>' + repos_array[i] + '</p>')
				}
			})
		}
		displayReposList()

		//ハッシュ値が変わった時の画面遷移
		window.addEventListener('hashchange', function() {
			if(location.hash === '#services'){
				$('.service__wrapper').empty()
				displayReposList()
			}else if(location.hash === '#service'){
				displayRepos(repos_name, 'README.md')
			}
		}, false)

		//デフォルトは英語版README表示
		$(document).on('click', '.repos_name p', function () {
			repos_name = $(this).html()
			displayRepos (repos_name, 'README.md')
		})

		//リポジトリ個別ページ
		function displayRepos (repos_name, file_type) {
			location.hash = 'service'

			function plot (data) {
				var md_data = marked(data)
				$('.service__wrapper').empty()
				$('div.service__wrapper')
					.append($('<div/>')
						.attr({'class': 'tab_wrapper'})
						.append($('<ul/>')
							.append($('<li class="service_en">English</li>'))
							.append($('<li class="service_ja">日本語</li>'))
						)
					)
				var markdown_body = $('.service__wrapper').append($('<div/>').attr({'class': 'markdown-body'}).html(md_data))
			}
			$.get(
				'https://raw.githubusercontent.com/dbcls/' + repos_name + '/master/' + file_type
			).done(function (data) {
				plot(data)
			}).fail(function() {
				console.log('データ入手失敗！')
			})

			//README英語版読み込み
			$(document).on('click', 'li.service_en', function () {
				location.hash = 'service'
				$.get(
					'https://raw.githubusercontent.com/dbcls/' + repos_name + '/master/README.md'
				).done(function (data) {
						plot(data)
				}).fail(function () {
					console.log('データ入手失敗！')
				})
			})

			//REAFME日本語版読み込み
			$(document).on('click', 'li.service_ja', function () {
				location.hash = 'service'
				$.get(
					'https://raw.githubusercontent.com/dbcls/' + repos_name + '/master/READMEja.md'
				).done(function (data) {
						plot(data)
				}).fail(function () {
					console.log('データ入手失敗！')
				})
			})
		}
	},
	'events': function () {},
	'member': function () {},
	'access': function () {},
	'achievement': function () {
		$.ajax({
		  url : "https://sheets.googleapis.com/v4/spreadsheets/1JGvXRqvu5A5IhaYfz40yTblNP7bZZL6GaPGaZl7knHM/values/References?key=AIzaSyCKBRLAEd_o7WAeBN5m0NZZ1Eusco7VtHw",
		  dataType : "json",
		  async: true,
		  success : function(data){
		  	var rows = "";
		    for (i = 0; i < data.values.length; i++) {
		        rows += 

		        	//'<tr><td><a href="' + data.values[i][0] + '">' + data.values[i][0] + '</a></td>' +
		        	'<tr><td><p>' + data.values[i][0] + '</p></td>'+
		            '<td><p>' + data.values[i][1] + '</p></td>'+ 
		            '<td><p>' + data.values[i][2] + '</p></td>' +
		            '<td><a href="' + data.values[i][3] + '">' + data.values[i][3] + '</a></td>' +
		            '<td><p>' + data.values[i][4] + '<p></td>' +
		            '<td><p>' + data.values[i][5] + '</p></td>'+ 
		            '<td><p>' + data.values[i][6] + '</p></td>' +
		            '<td><p>' + data.values[i][7] + '</p></td>' +
		            '<td><p>' + data.values[i][8] + '</p></td>';
		      	rows += "</tr>";
		    }
		    $("#table").append(rows);
		  }
		});
	},
	'contact': function () {},
};

script.addEventListener('load', function() {
	$(function() {
		var pageType = document.getElementsByTagName('html')[0].dataset.pageType;
		console.log(pageType)
		initialize[pageType]()

		//header言語切り替え
		$('.lang-en span').on('click', function () {
			var link = pageType + '-en.html'
			window.location.href = link
		})
		$('.lang-ja span').on('click', function () {
			var link = pageType + '.html'
			window.location.href = link
		})
	})	
})
