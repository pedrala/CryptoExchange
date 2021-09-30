function BackupManager(){this.headStack=null,this.tailStack=null,this.maxRow=50,this.restoreCount=20,this.itemHeight=0,this.itemContentCnt=0,this.$contentEle=null,this.scrollEle=null,this.backupScroll=0,this.delegator=null}BackupManager.prototype.create=function(t,e,a){if(this.delegator=t,void 0!=e&&(this.maxRow=e),void 0!=a&&(this.restoreCount=a),this.maxRow/this.restoreCount<3){var i=this.maxRow%this.restoreCount;i<10&&(i=10),this.maxRow=2*this.restoreCount+i}this.headStack=$('<div style="display:none;"></div>'),$("body").append(this.headStack),this.tailStack=$('<div style="display:none;"></div>'),$("body").append(this.tailStack)},BackupManager.prototype.destroy=function(){this.headStack.remove(),this.headStack=null,this.tailStack.remove(),this.tailStack=null},BackupManager.prototype.clearAll=function(){this.clearHead(),this.clearTail()},BackupManager.prototype.setItemHeight=function(t){this.itemHeight=t},BackupManager.prototype.setBackupInfo=function(t,e,a,i){this.itemHeight=t,this.itemContentCnt=e,this.scrollEle=a,this.$contentEle=i},BackupManager.prototype.minusBackupScroll=function(t){!afc.isIos&&afc.andVer>5.1||(this.backupScroll-=this.itemHeight*t)},BackupManager.prototype.plusBackupScroll=function(t){this.backupScroll+=this.itemHeight*t},BackupManager.prototype.clearHead=function(){this.headStack.children().remove()},BackupManager.prototype.backupHeadPre=function(t){this.headStack.prepend(t)},BackupManager.prototype.backupHead=function(t){this.headStack.append(t)},BackupManager.prototype.restoreHead=function(){return this.headStack.children().last()},BackupManager.prototype.getHeadCount=function(){return this.headStack.children().length},BackupManager.prototype.getHRestoreCount=function(){return Math.min(this.headStack.children().length,this.restoreCount)},BackupManager.prototype.clearTail=function(){this.tailStack.children().remove()},BackupManager.prototype.backupTailPre=function(t){this.tailStack.prepend(t)},BackupManager.prototype.backupTail=function(t){this.tailStack.append(t)},BackupManager.prototype.restoreTail=function(){return this.tailStack.children().last()},BackupManager.prototype.getTailCount=function(){return this.tailStack.children().length},BackupManager.prototype.getTRestoreCount=function(){return Math.min(this.tailStack.children().length,this.restoreCount)},BackupManager.prototype.applyBackupScroll=function(){if(0!=this.backupScroll){var t=this.backupScroll;return this.backupScroll=0,this.scrollEle.scrollTop+=t,t}return 0},BackupManager.prototype.checkHeadBackup=function(){var t=this.getHRestoreCount();if(t>0){for(var e=0;e<t;e++)this.$contentEle.prepend(this.restoreHead()),this.backupTail(this.delegator.getBottomItem());return this.plusBackupScroll(t/this.itemContentCnt),this.applyBackupScroll(),!0}return!1},BackupManager.prototype.checkTailBackup=function(){var t=this.getTRestoreCount();if(t>0){for(var e=0;e<t;e++)this.$contentEle.append(this.restoreTail()),this.backupHead(this.delegator.getTopItem());return this.minusBackupScroll(t/this.itemContentCnt),this.applyBackupScroll(),!0}return!1},BackupManager.prototype.appendItemManage=function(t){if(this.delegator.getTotalCount()>=this.maxRow){if(this.getTRestoreCount()>0)for(e=0;e<t.length;e++)this.backupTailPre(t[e]);else{this.$contentEle.append(t);for(var e=0;e<t.length;e++)this.backupHead(this.delegator.getTopItem());this.minusBackupScroll(1),this.applyBackupScroll()}return!0}return!1},BackupManager.prototype.prependItemManage=function(t){if(this.delegator.getTotalCount()>=this.maxRow){if(this.getHRestoreCount()>0)for(e=0;e<t.length;e++)this.backupHeadPre(t[e]);else{this.$contentEle.prepend(t);for(var e=0;e<t.length;e++)this.backupTail(this.delegator.getBottomItem())}return!0}return!1};