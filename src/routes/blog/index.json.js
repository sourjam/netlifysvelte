// import posts from './_posts.js';
import fs from 'fs';
import path from 'path';
import grayMatter from 'gray-matter';

const getAllPosts = () => {
	try {
		return fs.readdirSync('static/posts').map((filename) => {
			const post = fs.readFileSync(
				path.resolve('static/posts', filename),
				'utf-8'
			);
			return grayMatter(post).data;
		})
	} catch (e) {
		return [];
	}
}

// const contents = JSON.stringify(posts.map(post => {
// 	return {
// 		title: post.title,
// 		slug: post.slug
// 	};
// }));

export function get(_, res) {
	res.writeHead(200, {
	  "Content-Type": "application/json",
	});
	const posts = getAllPosts();
	res.end(JSON.stringify(posts));
  }