import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'
new Vue({
  el: '#app',
  data() {
    return {
      loading: false,
      form: {
        href: '',
        word: ''
      },
      links: []
    }
  },
  methods: {
    async searchLinks() {
      const {...linkword} = this.form
      const newData = await request('/', 'POST', linkword);
      this.links = newData;
      this.form.href = this.form.word = ''
    },

    async goTo(href)
    {
      window.location.href=href
    }
  },

})

async function request(url, method, data) {
    const headers = {}
    let body

    if (data) {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify(data)
    }

    const response = await fetch(url, {
        method,
        headers,
        body
    })
    return await response.json()

}