<template>
  <div class="search-result">
    <div class="loading-container" v-show="loading">
      <me-loading/>
    </div>
    <ul class="g-list" v-show="!loading && results.length">
       <li 
        class="g-list-item" 
        @click="$_search_selectItem(item[0])"
        v-for="(item,index) in results"
        :key="index"
       >
         <span class="g-list-text">{{item[0]}}</span>
       </li>
    </ul>
    <div class="no-result" v-show="!loading && !results.length">没有结果</div>
  </div>
</template>
<script>
import MeLoading from 'base/loading';
import {getSearchResult} from 'api/search';
import {searchMixin} from 'assets/js/mixins';
export default {
  name:'SearchResult',
  components: {
    MeLoading
  },
  mixins:[searchMixin],
  data(){
    return{
      loading:true,
      results:[]
    }
  },
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  watch: {
    query(query) {
      console.log(query);
      this.getResults(query);
    }
  },
  methods: {
    getResults(keyword) {
      if (!keyword) {
        return;
      }

      this.loading = true;
      getSearchResult(keyword).then(data => {
        if (data) {
          this.results = data;
          this.loading = false;
        }
      });
    }
  }
}
</script>