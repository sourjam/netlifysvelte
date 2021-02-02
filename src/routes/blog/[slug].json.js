// import posts from './_posts.js';
import path from 'path';
import fs from 'fs';
import grayMatter from 'gray-matter';
import marked from 'marked';

const getPost = (fileName) => {
	console.log(fileName)
	return fs.readFileSync(
		// path.resolve('static/posts', `${fileName}.md`),
		path.resolve('src/pages/blog', `${fileName}.md`),
		'utf-8'
	)
}

// const lookup = new Map();
// posts.forEach(post => {
// 	lookup.set(post.slug, JSON.stringify(post));
// });

export function get(req, res, _) {
	const { slug } = req.params;
	console.log('slug', slug)
	const post = getPost(slug);
	const renderer = new marked.Renderer();
	console.log('post', post)
	const { data, content } = grayMatter(post);
	console.log('post', data, content)
	const html = marked(content, { renderer });
	console.log(html)
	if (html) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		})
		res.end(JSON.stringify({ html, ...data }))
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		})

		res.end(
			JSON.stringify({
				message: 'Not found'
			})
		)
	}
}
