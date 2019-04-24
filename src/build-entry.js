import MarkdownEditor from './components/MarkdownEditor.vue';
import complex from './components/Theme'
import marked from './util/marked.js';

export {
	MarkdownEditor as Editor,
	complex as Theme,
	marked as Renderer
};

// Default export
export default {
	Editor: MarkdownEditor,
	Theme: complex,
	Renderer: marked
};
