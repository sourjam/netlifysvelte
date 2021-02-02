// import posts from './_posts.js';
import fs from 'fs';
import path from 'path';
import grayMatter from 'gray-matter';

const getAllPosts = () => {
	try {
		const ogPath = 'static/posts';
		const ohPath = 'src/pages/blog';
		return fs.readdirSync(ohPath).map((filename) => {
			const post = fs.readFileSync(
				path.resolve(ohPath, filename),
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
	console.log(posts)
	res.end(JSON.stringify(posts));
  }