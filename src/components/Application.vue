<template>

<div id="app-jb">
	<navbar />
	<b-container
		class="p-3"
	>
		<b-row>
			<b-col cols="3">
				<b-card
					no-body
					header="监控列表"
				>
					<b-list-group flush>

						<b-list-group-item
							v-if="Client.list.length === 0"
						><b-icon-laptop
							class="mr-1"
						/>空</b-list-group-item>

						<b-list-group-item
							@click="selectClient(client)"
							button
							v-for="(client, index) in Client.list"
							:key="index"
							:active="Client.selected.ip === client.ip"
						><b-icon-laptop
							class="mr-1"
						/>{{ client.ip }}<div
							class="d-flex justify-content-between mt-1"
						>
							<div><span style="font-weight:bold">当日日志：</span>{{ client.log_count_today }}</div>
							<div><span style="font-weight:bold">历史总量：</span>{{ client.log_count_all }}</div>
						</div></b-list-group-item>
					</b-list-group>
				</b-card>
			</b-col>
			<b-col cols="9">
				<b-button-toolbar justify>
					<div></div>
					<b-button
						size="sm"
						href="/get_report"
						variant="primary"
						target="_blank"
					><b-icon-download
						class="mr-2"
					/>导出日志</b-button>
				</b-button-toolbar>

				<h4><b-icon-eye
					class="mr-2"
				/>潜在风险预测</h4>

				<b-table
					head-row-variant="info"
					:fields="predictFields"
					:items="data.Predict"
					bordered
					class="mt-3"
					small
					hover
				>
					<template v-slot:cell(Probability1)="row">{{ row.item.Probability1.toFixed(6) }}</template>
				</b-table>

				<h4><b-icon-exclamation-octagon
					class="mr-2"
				/>系统事件统计</h4>

				<b-table
					head-row-variant="info"
					:fields="analysisFields"
					:items="data.Analysis"
					bordered
					class="mt-3"
					small
					hover
				>
					<template v-slot:cell(index)="row">{{ row.index + 1 }}</template>
				</b-table>

				<h4><b-icon-hourglass-split
					class="mr-2"
				/>系统警告记录</h4>

				<b-table
					head-row-variant="info"
					:fields="anomalyFields"
					:items="data.Anomaly"
					bordered
					class="mt-3"
					small
					hover
				></b-table>
			</b-col>
		</b-row>
	</b-container>
</div>

</template>

<script>
import Navbar from './Navbar';

export default {
	components: {
		Navbar
	},
	data() {
		return {
			Client: {
				list: [],
				selected: {}
			},
			data: {
				Analysis: [],
				Anomaly: [],
				Predict: []
			}
		};
	},
	methods: {
		selectClient(client) {
			this.Client.selected = client;
			this.updateData();
		},
		async updateData() {
			this.data = await this.$jb.backend.Data(this.Client.selected.ip).get();
		},
		async getIPList() {
			this.Client.list = await this.$jb.backend.Client.query();
		}
	},
	computed: {
		predictFields() {
			return [
				{ key: 'Name', label: '风险来源' },
				{ key: 'Example', label: '样本日志' },
				{ key: 'Probability1', label: '风险系数' }
			];
		},
		analysisFields() {
			return [
				{ key: 'index', label: '编号' },
				{ key: 'TypeFrequency', label: '出现次数' },
				{ key: 'TypeName', label: '事件类型' },
				{ key: 'Cause', label: '根因推断' },
			];
		},
		anomalyFields() {
			return [
				{ key: 'Type', label: '告警来源' },
				{ key: 'Log', label: '告警日志' },
				{ key: 'Time', label: '时间' },
			];
		}
	},
	mounted() {
		this.getIPList();
	}
};
</script>

<style lang="scss">
.b-table th {
	white-space: nowrap;
}
</style>
