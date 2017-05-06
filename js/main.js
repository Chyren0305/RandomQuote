//使用mashape api 這個可以指定名人(famous)或電影名言(movie)
var apiUrl = 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous';
var tweetLink = 'https://twitter.com/intent/tweet?text=';
// 顏色
var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', 
              '#e74c3c', '#9b59b6', '#FB6964', '#342224', 
              "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

//圖片
var imgs = ['128_html5_c.png', '128_css3_c.png', '128_JS_c.png', '128_jQuery_c.png', '128_github_c.png', '128_sublime-text_c.png',
            '128_photoshop_cc.png', '128_dreamweaver_c.png','128_illustrator-vector_c.png'];              


      new Vue({
        http: {
          headers: {
            "x-mashape-key": "QT5GQmPLB0mshmf1xw6zlrO6RPbqp1kT3owjsnw9IS1Kv7XsZF",
            "content-type": "application/x-www-form-urlencoded",
            "accept": "application/json",
            "cache-control": "no-cache"
          },
        },
        el: '#view',
        data: {
           quote: ''
        },

        mounted: function() {

            this.getQuote()

          },
        methods: {
          reloadPage: function () {
            this.getQuote()
          },

          getQuote: function () {
            this.$http.get(apiUrl).then(function (request) {
                                        //也可以使用 "(request) =>" 這種形式
               this.$set(this, 'quote', request.data) //vue1使用的是request.json() vue2需加this繫結 轉成request.data
               console.log(request.data);
            
              //換模板
              var color = Math.floor(Math.random() * colors.length); 
              var img = Math.floor(Math.random() * imgs.length);

              $("html body").animate({
                backgroundColor: colors[color],
                color: colors[color]
              }, 1500);

              $(".btn").animate({
                backgroundColor: colors[color]
              }, 1500);

              //圖片更動
              console.log(imgs[img]);

              $(".photo").animate({
                opacity: .1,
              }, 750, function () {
                $(".photo").css({ 'background-image': "url('imgs/"+ imgs[img] +"')" }).animate({ opacity: 1}, 750)
              });

            }, (request) => {
              // if api not working
              console.log(request)
            })
          },




          tweetQuote: function () {
            var tweetUrl = tweetLink + '"' + this.quote.quote + '" ---' + this.quote.author + '&hashtags=quotes';
            //使用window.open 客製化大小
            window.open(tweetUrl, 'twitter', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0');

            return false;
          }
        
        },

      });



   