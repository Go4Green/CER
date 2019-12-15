export default function(title, to_lowercase, only_first_char) {
    const a = only_first_char ? title.match(/[A-Z]/g).join('') : title.replace(/ /g, '-').replace(/[^\w-]+/g, '');
    return to_lowercase ? a.toLowerCase() : a;
}