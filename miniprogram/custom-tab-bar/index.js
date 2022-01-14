Component({
	data: {
		active: 0,
		list: [
      {
				icon: 'home-o',
				text: '主页',
				url: '../index4/index4'
			},
			{
				icon: 'notes-o',
				text: '活动室借用',
				url: '../index1/index1'
			},
			{
				icon: 'edit',
				text: '志愿者报名',
				url: '../index3/index3'
			},
			{
				icon: 'manager-o',
				text: '个人中心',
				url: '../index2/index2'
			}			
		],
	},

	methods: {
		onChange(event) {
			this.setData({ active: event.detail });
			wx.switchTab({
				url: this.data.list[event.detail].url
			});
		},

		init() {
			const page = getCurrentPages().pop();
			this.setData({
				active: this.data.list.findIndex(item => item.url === `/${page.route}`)
			});
		}
	}
});