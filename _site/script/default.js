var script = document.createElement('script')
var tags = [
  'publishment',
  'service',
  'event',
  'invite',
  'other'
]
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

script.setAttribute('src', 'https://code.jquery.com/jquery-3.2.1.min.js')
document.head.appendChild(script)

var initialize = {
  'index': function() {
    tags.map(function(data) {
      $('a[tag="' + data + '"]').before('<img src="img/icon_tag_' + data + '.svg" class="news__tag-icon" alt="" >')
    })
    const ROTATE_SPEED = 40000;
    const NUMBER_OF_PANEL = 20; //パネル数
    const APPEAR_PITCH = ROTATE_SPEED / NUMBER_OF_PANEL; //パネルが出現する間隔
    const currentTime = 0;
    const FPS = 50; //１秒間のコマ数
    const RADIAN_UNIT = ((Math.PI) * .1) / 1000 * FPS; //1コマの移動距離＝速さ
    const Y_UNIT = 0.00001; //y軸の速度
    const UNIT = (Math.PI * 2) / NUMBER_OF_PANEL; // 弧度
    const RADIUS = 480; //半径

    class Panel {
      constructor() {
        var url = ''
        $('.main-image__contents').append('<div class="panel">')
        for (let i = 0; i < services_array.length; i++) {
          url = 'img/top_assets/' + services_array[i] + '_f.png'
          var panel_style = {
            'background-image': 'url(' + url + ')',

          }
          $('.panel:nth-of-type(' + i + ')').css(panel_style)
        }
        this.$ = $('.panel:last-child');
        this.reset()
        $('.panel').hover(function() {
          stopTimer()
          // $('.main-image__veil, .main__forcused-page__description').css('display', 'block')
          // var resized_image = $(this).css('background-image').toString()
          // var forcused_style = {
          //    'width': '340px',
          //    'height': '400px',
          //    'position': 'absolute',
          //    'top': '80px',
          //    'left': '50%',
          //    'pointer-events': 'none',
          //    'z-index': '9999',
          //    'transform': 'rotateY(0) translateX(-50%)',
          //    'background-image': resized_image
          // }

          // var forcused_image = $(this).clone(true).removeClass('panel').addClass('forcused_panel').css(forcused_style)
          // $('body').append(forcused_image)

        })

        $('.panel').mouseout(function() {
          startTimer()
          $('.forcused_panel').remove()
          $('.main-image__veil, .main__forcused-page__description').css('display', 'none')
        })

      }

      step() {
        function radian2degree(radian) {
          return 180 * radian / Math.PI;
        }
        const currentRadius = RADIAN_UNIT * this.counter / 2 + UNIT
        this.$.css({
          top: (300 - (this.counter++) / 1.2) + 'px',
          left: -Math.cos(currentRadius) * RADIUS + 430 + 'px',
          transform: 'translateY(' + Y_UNIT * this.counter + 'px) translateZ(' + (Math.sin(currentRadius) * RADIUS) / 2 + 'px) rotateY(' + (radian2degree(currentRadius) + 270) + 'deg)'
        });
        if (this.counter / 10 > 100) {
          stage.shift();
          backStage.push(this);
        }
        let z_position = Math.sin(currentRadius) * RADIUS
        if (z_position < 0) {
          var opacity = z_position * (-1)
          opacity = ((500 - opacity) / 500) * 100
          opacity = Math.round(opacity) / 100 + 0.2
          this.$.css({ 'opacity': opacity, 'z-index': '-100' })
        } else if (z_position >= 0) {
          this.$.css({ 'opacity': 1, 'z-index': '100' })
        }
      }

      reset() {
        this.counter = 0;
        this.$.css({
          top: '100vh',
          left: '50vw'
        })
      }
    }

    var stage = [],
      backStage = [];
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


    function animation() {
      for (var i = 0; i < stage.length; i++) {
        stage[i].step();
      }
    };

    function startTimer() {
      timer = setInterval(function() {
        animation()
      }, FPS)
    }

    function stopTimer() {
      clearInterval(timer)
    }

    startTimer()
  },
  'news': function() {
    tags.map(function(data) {
      $('a[tag="' + data + '"]').before('<img src="/dbcls-test/img/icon_tag_' + data + '.svg" class="news__tag-icon" alt="" >')
    })
    $('.post__individual').each(function() {
      tag_className = $(this).attr('class')
      tag_className = tag_className.match(/\[\"(.+?)\"\]/g)
      tag_className = tag_className[0].match(/\"(.+?)\"/g)
      tag_className = tag_className.join(' ')
      tag_className = tag_className.replace(/"/g, '')
      $(this).addClass(tag_className)
    })

    // var result  = tag_className.replace(/\[\"(.+?)\"\]/, '/1')
    // console.log(result)

    // tag_className.replace(/["(/w)"]/, '/1')

    // var mixer = mixitup(containerEl, {
    //   multifilter: {
    //     enable: true // enable the multifilter extension for the mixer
    //   }
    // });
  },
  'post': function() {
    tags.map(function(data) {
      $('a[tag="' + data + '"]').before('<img src="/dbcls-test/img/icon_tag_' + data + '.svg" class="news__tag-icon" alt="" >')
    })
  },
  'about': function() {
    $('.lazy-mail').each(function() {
      var self = this;
      setTimeout(function() {
        var $target = jQuery(self);
        var address = $target.data("address").split("_at_").join("@").split("_dot_").join(".");
        $target
          .attr("href", "mailto:" + address)
          .text(address);
      }, 1000);
    });
  },
  'research': function() {},
  'services': function() {
    var repos_name = '';
    var repos_array = [];
    var tags_array

    //レポジトリ一覧
    function displayReposList() {
      $.get('https://api.github.com/users/dbcls/repos', function(data) {

        repos_array = data.map(data => data.name);
      })
    }
    displayReposList()


    //担当者サービスの連想配列つくる（まだやってない
    var servicePerson = {};

    function servicesFrontDisplay() {
      $.ajax({
        url: "https://sheets.googleapis.com/v4/spreadsheets/1bSnbUztPDl3nhjQFbScjtTXpQtXOkqZE83NMilziHQs/values/%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E4%B8%80%E8%A6%A7?key=AIzaSyAIstRfTWKWRqNKpkMk-uGYAQJw0myzMh4",
        dataType: "json",
        async: true,
        success: function(data) {

          var elementArray = data.values;

          //column1に"Y"のあるrowをとってくる
          var symbolYList = elementArray.filter((YList) => {
            return (YList[0] === "Y");
          })
          console.log(symbolYList);

          var element = "";
          //data.values.splice(0, 1)
          for (i = 0; i < symbolYList.length; i++) {

            element += '<article class="article__section contener-type-box">' +
              '<div id="repos_name' + i + '" class="repos_name">' +
              '<p class="name">' + symbolYList[i][2] + '</p>' +
              '<div class="keyword">だれでも自由に閲覧・利用できるように、Web上にて無料で公開しているライフサイエンス分野の画像・イラスト集です。</div>' +
              '<div class="service_category dna">DNA &amp; RNA</div>' +
              '<div class="service_type db">Database</div>' +
              '<div class="btn-box">' +
              '<a href="./md/' + symbolYList[i][2] + '-README.md" class="page_btn more_btn">' + '詳細' + '</a>' +
              '<a href="' + symbolYList[i][3] + '" class="page_btn access_btn">アクセス</a>' +
              '</div></div>' +
              '<div id="repos_image0" class="repos_image">' +
              '<img src="./img/service_assets/' + symbolYList[i][2] + '.png' + '" art="' + symbolYList[i][2] + '" class="object-fit-img img_services"></div>'

            element += '</article>'

          }
          $("#service_list").append(element);
        }
      })
    }
    servicesFrontDisplay();
    $('#service-on').click(function() {
      $("#table").empty();
      $("#service_list").empty();
      servicesFrontDisplay();
    })

    function pointerActive() {
      console.log("add");
      $('outline-list-category__title').click().addClass('on');
    }
    pointerActive();
    //$("#service_list").on('click', '#papers_citing_dbcls_services').css({'display':'none'});

    //Papers citing DBCLS services
    $('#papers_citing_dbcls_services').click(function() {
      $("#service_list").empty();

      $.ajax({
        url: "https://sheets.googleapis.com/v4/spreadsheets/1JGvXRqvu5A5IhaYfz40yTblNP7bZZL6GaPGaZl7knHM/values/References?key=AIzaSyCKBRLAEd_o7WAeBN5m0NZZ1Eusco7VtHw",
        dataType: "json",
        async: true,
        success: function(data) {

          var rows = "";
          var first_col = data.values[0]

          rows += '<thead><tr>';
          for (i = 0; i < first_col.length; i++) {
            rows += '<th>' + first_col[i] + '</th>'
          }
          rows += '</tr></thead>';

          data.values.splice(0, 1);
          for (i = 0; i < data.values.length; i++) {

            rows +=
              //'<tr><td><a href="' + data.values[i][0] + '">' + data.values[i][0] + '</a></td>' +
              '<tr><td><p>' + data.values[i][0] + '</p></td>' +
              '<td><p>' + data.values[i][1] + '</p></td>' +
              '<td><p>' + data.values[i][2] + '</p></td>' +
              '<td><a href="' + data.values[i][3] + '">' + data.values[i][3] + '</a></td>' +
              '<td><p>' + data.values[i][4] + '<p></td>' +
              '<td><p>' + data.values[i][5] + '</p></td>' +
              '<td><p>' + data.values[i][6] + '</p></td>' +
              '<td><p>' + data.values[i][7] + '</p></td>'
            rows += "</tr>";

          }
          $("#table").append(rows);
        }
      })
    })

    //ハッシュ値が変わった時の画面遷移
    window.addEventListener('hashchange', function() {
      if (location.hash === '#services') {
        $('.service__wrapper').empty()
        displayReposList()
      } else if (location.hash === '#service') {
        displayRepos(repos_name)
      }
    }, false)

    //デフォルトは英語版README表示
    //.on('click', '.repos_name p, .access_btn', function ()
    $(document).on('click', '.repos_name p', function() {
      repos_name = $(this).html()
      displayRepos(repos_name)
    })

    //リポジトリ個別ページ
    function displayRepos(repos_name) {
      location.hash = 'service'

      function plot(data) {
        var md_data = marked(data)
        $('.service__wrapper').empty()
        $('div.service__wrapper')
          .append($('<div/>')
            .attr({ 'class': 'tab_wrapper' })
            .append($('<ul/>')
              .append($('<li class="service_en">English</li>'))
              .append($('<li class="service_ja">日本語</li>'))
            )
          )
        var markdown_body = $('.service__wrapper').append($('<div/>').attr({ 'class': 'markdown-body' }).html(md_data))
      }
      //mdファイル初期表示
      $.get(
        'https://raw.githubusercontent.com/dbcls/' + repos_name + '/master/README.md'
      ).done(function(data) {
        plot(data)
      }).fail(function() {
        console.log('データ入手失敗！')
      })

      //README英語版読み込み
      $(document).on('click', 'li.service_en', function() {
        location.hash = 'service'
        $.get(
          'https://raw.githubusercontent.com/dbcls/' + repos_name + '/master/README.md'
        ).done(function(data) {
          plot(data)
        }).fail(function() {
          console.log('データ入手失敗！')
        })
      })

      //REAFME日本語版読み込み
      $(document).on('click', 'li.service_ja', function() {
        location.hash = 'service'
        $.get(
          'https://raw.githubusercontent.com/dbcls/' + repos_name + '/master/READMEja.md'
        ).done(function(data) {
          plot(data)
        }).fail(function() {
          console.log('データ入手失敗！')
        })
      })
    }
  },
  'events': function() {
    tags.map(function(data) {
      $('a[tag="' + data + '"]').before('<img src="/dbcls-test/img/icon_tag_' + data + '.svg" class="news__tag-icon" alt="" >')
    })
  },
  'member': function() {
    location.hash = 'member'

    function memberFrontDisplay() {
      $.ajax({
        url: "https://sheets.googleapis.com/v4/spreadsheets/1bSnbUztPDl3nhjQFbScjtTXpQtXOkqZE83NMilziHQs/values/%E7%A0%94%E7%A9%B6%E8%80%85ID?key=AIzaSyAIstRfTWKWRqNKpkMk-uGYAQJw0myzMh4",
        dataType: "json",
        async: true,
        success: function(data) {

          var element = "";
          var listSubNav = "";
          data.values.splice(0, 1);

          for (j = 0; j < data.values.length; j++) {
            console.log(memberList);

            listSubNav += '<li>' + data.values[j][0] + '</li>';

          }
          $("#memberList").append(listSubNav);

          for (i = 0; i < data.values.length; i++) {

            var name = data.values[i][0]
            var image = data.values[i][1]
            //var name_en = data.values[i][]
            //var position = data.values[i][]
            //var position_en = data.values[i][]
            //var keyword = data.values[i][]
            //var keyword_en = data.values[i][]
            var orcid = data.values[i][4]
            var googleScholar = data.values[i][6]
            var github = data.values[i][7]
            //var mail = data.values[i][]

            element += '<article class="article__section contener-type-box contener-type-box__member">' +
              '<div class="repos_image">' + '<img src="./img/member/' + image + '" alt="' + name + '" class="img_member"></div>' +
              '<div id="repos_name" class="repos_name">' +
              '<div class="name">' + name + '<span class="position">' + 'position' + '</span></div>' +
              '<div class="name en">' + "name_en" + '</div>' +
              '<div class="keyword">' + "keyword" + '</div>' +
              '<div class="services">担当サービス</div>' +
              '<div class="btn-box">' +
              '<a href="' + googleScholar + '" class="page_btn scholar">Google Sholar</a>' +
              '<a href="https://github.com/' + github + '" class="page_btn git">GitHub</a>' +
              '<a href="https://orcid.org/' + orcid + '" class="page_btn orcid_btn">ORCID</a>' +
              '<a href="' + "mail" + '" class="page_btn mail_btn">mail</a></div>'

            element += '</article>'

          }
          $("#member-list").append(element);
        }
      })
    }
    memberFrontDisplay();
  },
  'access': function() {
    location.hash = 'access'
  },
  'contact': function() {
    location.hash = 'contact'
  }
};

script.addEventListener('load', function() {
  $(function() {
    var pageType = document.getElementsByTagName('html')[0].dataset.pageType;
    console.log(pageType)
    initialize[pageType]()

    //header言語切り替え
    $('.lang-en span').on('click', function() {
      var link = pageType + '-en.html'
      window.location.href = link
    })
    $('.lang-ja span').on('click', function() {
      var link = pageType + '.html'
      window.location.href = link
    })
  })
})