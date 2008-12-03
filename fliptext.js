(function() {
	tinymce.create('tinymce.plugins.fliptext', {
		init : function(ed, url) {
			ed.addCommand('fliptext', function() {

				var flipTable = {
					a : '\u0250',
					b : 'q',
					c : '\u0254',
					d : 'p',
					e : '\u01DD',
					f : '\u025F',
					g : '\u0183',
					h : '\u0265',
					i : '\u0131',
					j : '\u027E',
					k : '\u029E',
					//l : '\u0283',
					m : '\u026F',
					n : 'u',
					r : '\u0279',
					t : '\u0287',
					v : '\u028C',
					w : '\u028D',
					y : '\u028E',
					'.' : '\u02D9',
					'[' : ']',
					'(' : ')',
					'{' : '}',
					'?' : '\u00BF',
					'!' : '\u00A1',
					"\'" : ',',
					'<' : '>',
					'_' : '\u203E',
					';' : '\u061B',
					'\u203F' : '\u2040',
					'\u2045' : '\u2046',
					'\u2234' : '\u2235',
					'\r' : '\n'
				}

				for (i in flipTable) {
					flipTable[flipTable[i]] = i
				}

				aString = tinyMCE.activeEditor.selection.getContent({format : 'text'});
				var last = aString.length - 1;
				var result = new Array(aString.length)
				for (var i = last; i >= 0; --i) {
					var c = aString.charAt(i)
					var r = flipTable[c]
					result[last - i] = r != undefined ? r : c
				}
				flipped = result.join('');
				tinyMCE.activeEditor.selection.setContent(flipped);
			});
			ed.addButton('fliptext', {
				title : 'Fliptext',
				cmd : 'fliptext',
				image : url + '/fliptext.png'
			});
		},
		getInfo : function() {
			return {
					longname  : 'fliptext',
					author 	  : 'Telesphore',
					authorurl : 'http://www.telesphore.org',
					infourl   : 'http://www.telesphore.org',
					version   : "1.0"
			};
		}
	});
	tinymce.PluginManager.add('fliptext', tinymce.plugins.fliptext);
})();

(function() {
	tinymce.create('tinymce.plugins.fliptexttag', {
		init : function(ed, url) {
			ed.addCommand('fliptexttag', function() {
				aString = tinyMCE.activeEditor.selection.getContent({format : 'text'});
				tinyMCE.activeEditor.selection.setContent('[fliptext]'+aString+'[/fliptext]');
			});
			ed.addButton('fliptexttag', {
				title : 'Fliptext',
				cmd : 'fliptexttag',
				image : url + '/fliptexttag.png'
			});
		},
		getInfo : function() {
			return {
					longname  : 'fliptext',
					author 	  : 'Telesphore',
					authorurl : 'http://www.telesphore.org',
					infourl   : 'http://www.telesphore.org',
					version   : "1.0"
			};
		}
	});
	tinymce.PluginManager.add('fliptexttag', tinymce.plugins.fliptexttag);
})();