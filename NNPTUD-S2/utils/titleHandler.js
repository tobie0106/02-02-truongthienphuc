module.exports = {
    ConvertTitleToSlug: function (title) {
        let result = title.toLowerCase();
        // Remove accents
        result = result.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        // Replace special characters and spaces with -
        result = result.replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim('-');
        return result;
    }
}
