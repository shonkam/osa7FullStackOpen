Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username: 'test username', password: 'salainen'
  }).then(response => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
    }
  })
  cy.visit('http://localhost:3000')
})

describe('Blog ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'test name',
      username: 'test username',
      password: 'salainen'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Blog app')
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('Login fails with wrong credentials', function () {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('test username')
      cy.get('#password').type('wrong')
      cy.get('#submit').click()

      cy.contains('wrong credentials')
    })

    it('Login succeed with right credentials', function () {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('test username')
      cy.get('#password').type('salainen')
      cy.get('#submit').click()

      cy.contains('Logged in as test name')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test username', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('www.testurl.com')
      cy.get('#likes').type(44)
      cy.get('#create').click()

      cy.contains('test title')

    })

    describe('When blog is created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'nice title',
          author: 'wonderful author',
          url: 'www.exampleurl.com',
          likes: 44
        })
      })

      it('Blog can be liked', function () {

        cy.get('#view').click()
        cy.get('#like').click()

        cy.contains('likes 45')
      })

      it('blog can be removed', function () {
        cy.get('#view').click()
        cy.get('#remove').click()

        cy.contains('Removed blog nice title by wonderful author')
      })

      it('blogs are sorted by highest amount of likes', function () {
        cy.createBlog({
          title: 'second title with the most likes',
          author: 'wonderful author',
          url: 'www.exampleurl.com',
          likes: 79
        })

        cy.createBlog({
          title: 'third title with likes between other blogs',
          author: 'wonderful author',
          url: 'www.exampleurl.com',
          likes: 64
        })

        cy.get('#view').click()
        cy.contains('likes 79')
      })
    })
  })
})