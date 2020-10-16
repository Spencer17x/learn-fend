// timers -> i/o callbacks -> idle、prepare (供内部使用) -> poll -> check -> close callback

setImmediate(() => {
	console.log('immediate');
});

setTimeout(() => {
	console.log('timeout');
}, 0);