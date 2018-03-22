var script = document.createElement('script')
script.setAttribute('src', 'https://code.jquery.com/jquery-3.2.1.min.js')
document.head.appendChild(script)

var initialize = {
	'index': function () {},
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
