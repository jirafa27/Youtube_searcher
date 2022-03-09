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
      links: [],
      all_subs:[],

    }
  },
  methods: {
    async getAllSubs() {
      const {...linkword} = this.form
      this.all_subs = await request('/', 'POST', linkword);
    },

   async getFilteredSubs(){
       await this.getAllSubs()
       this.links = []
       await this.filterSubs()

   },

    async goTo(href)
    {
      window.location.href=href
    },

    async filterSubs() {
          if (document.getElementById('word').value.length>=3)
          {
              this.links = []
              for (let i = 0; i < this.all_subs.length; i++) {
                  if (this.all_subs[i]['text'].includes(this.form.word.toLowerCase())) {
                      this.links.push(this.all_subs[i])
                  }
              }
              if (this.links.length===0)
              {
                  document.getElementById('nothing').innerHTML = 'Ничего не найдено:0('
              }
              else {
                  document.getElementById('nothing').innerHTML = ''
              }
          }


      },


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

