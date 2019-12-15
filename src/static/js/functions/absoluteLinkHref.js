export default function(href) {
	let link = document.createElement("a");
    link.href = href;
    return link.href;
}