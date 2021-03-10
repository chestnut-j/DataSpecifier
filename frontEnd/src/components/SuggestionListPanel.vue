<template>
    <div class="panel">
        <div class="header">Suggestion List</div>
    </div>
</template>
<script>
export default {
  name: 'SuggestionListPanel',
  data () {
    return {
      data: []
    }
  }
}
</script>

<style scoped>
.header {
    padding: 20px;
    font-size:20px;
    text-align: center;
}
.panel {
    height:100%;
    width:600px;
}
</style>
