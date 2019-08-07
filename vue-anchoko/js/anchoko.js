console.clear()

new Vue({
	el: '#app',
	data: {
		selectedCategory: '',
		message: '',
		categories: [
			{'id': 1, 'name' :'テストup'},
			{'id': 2, 'name' :'テストサーバーup'},
			{'id': 3, 'name' :'完了メール'},
			{'id': 4, 'name' :'期限'},
			{'id': 5, 'name' :'調整'},
			{'id': 6, 'name' :'リスケ'},
			{'id': 7, 'name' :'問い合わせ回答'},
			{'id': 8, 'name' :'確認'},
			{'id': 9, 'name' :'欠席(例文)'},
			{'id': 10, 'name' :'作業進捗'}
		]
	},
	methods: {
		fetchMsgs: function() {
			var tmp_message = '';
			var id_s = this.selectedCategory
			if (id_s == 1) {
				tmp_message = '修正データを下記にアップしましたので、ご確認お願いします。<br>[修正点]'
			} else if (id_s == 2) {
				tmp_message = '以下ページの修正データをテストサーバーにupしました。<br>ご確認お願いします。'
			} else if (id_s == 3) {
				tmp_message = '表題の件について、データを下記にアップしましたので、ご確認お願いします。<br>[url]'
			} else if (id_s == 4) {
				tmp_message = '本件、MM/DD、hh:mmまでに対応します。'
			} else if (id_s == 5) {
				tmp_message = '恐れ入りますが、初稿日MM月DD日までの展開は厳しめです。<br>MM月DD日HH:00時までの展開で調整いただけますでしょうか？'
			} else if (id_s == 6) {
				tmp_message = '＞ [先方依頼]<br>制作側の事情で恐れ入りますがX時までにリスケお願いします。'
			} else if (id_s == 7) {
				tmp_message = '＞ [先方依頼]<br>この件につきましてこちら側では<br>[以下回答]'
			} else if (id_s == 8) {
				tmp_message = '(内容について確認したい事項をいくつかまとめたので確認お願いします。)/(表題の件について一点確認したいことがございます。)<br>[確認事項]<br>恐れ入りますが、本日XX時目処でご返答お願いします。'
			} else if (id_s == 9) {
				tmp_message = '各位<br>お疲れ様です。[名前]です。<br>本日17:00からの[MTG]ですが、<br>[理由]のため出席できかねます。<br>大変ご迷惑をおかけしまして申し訳ございません。<br>よろしくお願いします。'
			} else if (id_s == 10) {
				tmp_message = '本日の作業進捗を報告いたします。<br>・[案件名]<br>XX件<br>未着手/作業中/完了：[案件名]<br>[状況]<br>[up先]'
			} else  {
				alert('Invalid value!!')
			}
			this.message = tmp_message;
		}
	}
})

