<template>

<b-navbar toggleable="lg" type="dark" variant="dark">
	<b-navbar-brand>{{ $jb.options.title }}</b-navbar-brand>

	<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

	<b-collapse id="nav-collapse" is-nav>
		<b-navbar-nav>
			<b-nav-item
				active
			><b-icon-laptop class="mr-1" />监控首页</b-nav-item>
		</b-navbar-nav>
	</b-collapse>
</b-navbar>

</template>

<script>
export default {

};
</script>

<style>

</style>
