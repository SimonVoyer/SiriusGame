class ElderSpawn {

	constructor(musicManager, canvas, context) {
		this.musicManager = musicManager;
		this.canvas = canvas;
		this.context = context;
		this.isAlive = true;
		this.battlePose();
	}

	tick() {
		this.x = this.canvas.width * 7/10;
		this.y =  window.innerHeight;
		if(this.sprite != null)	{
			this.sprite.tick(this.x, this.y, this.context);
		}
	}

	battlePose() {
		if (this.isAlive) {
			let columnCount = 5;
			let rowCount = 1;
			let refreshDelay = 180;
			let loopColumns = true;
			let scale = 3.0;
			this.sprite = new TiledImage("images/demon_sprites_battle.png", columnCount, rowCount, refreshDelay, loopColumns, scale, null);
			this.sprite.changeRow(0);
			this.sprite.changeMinMaxInterval(0, columnCount);
		}
	}

	attack(){
		this.musicManager.playDemonAttack();
		let columnCount = 6;
		let rowCount = 1;
		let refreshDelay = 180;
		let loopColumns = true;
		let scale = 3.0;
		this.sprite = new TiledImage("images/demon_sprites_attack.png", columnCount, rowCount, refreshDelay, loopColumns, scale, null);
		this.sprite.changeRow(0);
		this.sprite.changeMinMaxInterval(0, columnCount);
		setTimeout(() => this.battlePose(), 1100);
	}

	tookDamage() {
	this.musicManager.playDemonDamaged();
		if (this.isAlive) {
			let columnCount = 7;
			let rowCount = 1;
			let refreshDelay = 180;
			let loopColumns = true;
			let scale = 3.0;
			this.sprite = new TiledImage("images/demon_sprites_damaged.png", columnCount, rowCount, refreshDelay, loopColumns, scale, null);
			this.sprite.changeRow(0);
			this.sprite.changeMinMaxInterval(0, columnCount);
			setTimeout(() => this.battlePose(), 1100);
		}
	}

	banished(){
		this.musicManager.playDemonBanished();
		let columnCount = 7;
		let rowCount = 1;
		let refreshDelay = 100;
		let loopColumns = true;
		let scale = 3.0;
		this.sprite = new TiledImage("images/demon_sprites_death.png", columnCount, rowCount, refreshDelay, loopColumns, scale, null);
		this.sprite.changeRow(0);
		this.sprite.changeMinMaxInterval(0, columnCount);
		setTimeout(()=>this.despawn(), 500);
	}

	despawn(){
		this.sprite = null;
	}

}