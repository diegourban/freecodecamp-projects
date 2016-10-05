var quotes = [];
quotes.push({text:"We owe the Aboriginal peoples a debt that is four centuries old. It is their turn to become full partners in developing an even greater Canada. And the reconciliation required may be less a matter of legal texts than of attitudes of the heart.", author:"Romeo LeBlanc"});

quotes.push({text:"The major religions, Christianity, Judaism, Islam, they deny somehow that God has a feminine face. However, if you go to the holy texts, you see there is this feminine presence.", author:"Paulo Coelho"});

quotes.push({text:"Some national parks have long waiting lists for camping reservations. When you have to wait a year to sleep next to a tree, something is wrong.", author:"George Carlin"});

quotes.push({text:"Now I see the secret of the making of the best persons. It is to grow in the open air and to eat and sleep with the earth.", author:"Walt Whitman"});

quotes.push({text:"Just the knowledge that a good book is awaiting one at the end of a long day makes that day happier.", author:"Kathleen Norris"});

quotes.push({text:"I like pigs. Dogs look up to us. Cats look down on us. Pigs treat us as equals.", author:"Sir Winston Churchill"});

quotes.push({text:"I don't give a damn for a man that can only spell a word one way.", author:"Mark Twain"});

quotes.push({text:"If you are a terror to many, then beware of many.", author:"Ausonius"});

quotes.push({text:"Everyone is entitled to be stupid, but some abuse the privilege.", author:"Unknown"});

quotes.push({text:"At the height of laughter, the universe is flung into a kaleidoscope of new possibilities.", author:"Jean Houston"});

$(document).ready(function() {
	var animation = 'animated bounceIn';
	var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	generateRandomQuote();
	
	$('button[name=generate]').on('click', function(){
		generateRandomQuote();
		$('blockquote').addClass(animation).one(animationEnd, function(){
			$(this).removeClass(animation);
		});
	});
});

function generateRandomQuote() {
	var quote = quotes[Math.floor(Math.random()*quotes.length)];
	$('blockquote p').text(quote.text);
	$('blockquote footer').text(quote.author);
}

function tweetIt() {
	var quote = $('blockquote p').text() + ' - ' + $('blockquote footer').text();
	var win = window.open('https://twitter.com/intent/tweet?text=' + quote, '_blank');
	win.focus();
}

 
