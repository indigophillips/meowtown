var path = require('path')

var express = require('express')
var hbs = require('express-handlebars')

var server = express()

// view engine config

var hbsConfig = {
  defaultLayout: 'main',
  extname: 'hbs'
}
server.engine('hbs', hbs(hbsConfig))
server.set('view engine', 'hbs')

// middleware

server.use(express.urlencoded({ extended: false }))
server.use(express.static(path.join(__dirname, 'public')))

// sample data

var data = {
  cats: [
    {
      id: 1,
      name: 'Fluffy',
      likes: 'mice',
      hates: 'baths',
      image: 'https://i0.wp.com/theverybesttop10.com/wp-content/uploads/2016/03/Top-10-Award-Winning-Cats-In-Easter-Costumes.jpg?resize=482%2C328',
      lifestory: 'A woman rescues a stray cat that seems to show appreciation for the piano music she plays. She comes to believe that the cat is the reincarnation of a famous composer.'
    },
    {
      id: 2,
      name: 'Tick',
      likes: 'tuna',
      hates: 'being awake',
      image: 'https://i0.wp.com/pawesomecats.com/wp-content/uploads/2016/04/American-Shorthair-cat.jpg?resize=740%2C528',
      lifestory: 'At a party at a country house, a guest announces that he can teach animals to speak. As proof he produces the host’s cat, Tobermory, who proceeds to embarrass the guests by revealing details of private conversations.'
    },
    {
      id: 3,
      name: 'Paddy',
      likes: 'disappearing into the night',
      hates: 'salmon',
      image: 'https://thumb7.shutterstock.com/display_pic_with_logo/519241/570350101/stock-photo-steel-robotic-jaguar-cat-d-render-in-a-creeping-pose-panther-robot-570350101.jpg',
      lifestory: 'The narrator explains the character of cats and how they get satisfaction from life. He contrasts the cat’s behavior in a domesticated and a free environment.'
    },
    {
      id: 4,
      name: 'Woof',
      likes: 'wool',
      hates: 'rain',
      image: 'https://78.media.tumblr.com/9e63caebf31ce444efff85acd077cfbe/tumblr_ox5ys4c5Tb1vh4j87o1_500.png',
      lifestory: 'As a city in Italy has expanded, it has restricted the movement of cats. On his lunch break, Marcovaldo follows a cat and discovers some of its world, eventually finding a garden of cats on an undeveloped piece of land.'

    }
  ]
}

// routes

server.get('/', function (req, res) {
  res.redirect('/cats') // what is this doing?
})

server.get('/cats', function (req, res) {
  res.render('index', data)
})

server.get('/cats/new', function (req, res) {
  res.render('new')
})

server.get('/cats/:id', function (req, res) {
  console.log(req.params) // try going to /cats/1
  var id = req.params.id
  var catInfo = data.cats.find(function (element) {
    return element.id === parseInt(id)
  })
  res.render('show', catInfo)
})

server.post('/cats', function (req, res) {
  console.log(req.body)
})

module.exports = server
