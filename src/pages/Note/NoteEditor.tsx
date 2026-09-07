import {
	BlockTypeSelect,
	BoldItalicUnderlineToggles,
	CreateLink,
	headingsPlugin,
	ListsToggle,
	listsPlugin,
	MDXEditor,
	markdownShortcutPlugin,
	quotePlugin,
	thematicBreakPlugin,
	toolbarPlugin,
	UndoRedo,
} from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";

type Props = {
	value: string;
	onChange: (value: string) => void;
};

export function NoteEditor({ value, onChange }: Props) {
	console.log(value);
	return (
		<div>
			<MDXEditor
				markdown={`# Hello

                - One
                - Two
                - Three

1. First
2. Second
3. Third`}
				onChange={onChange}
				plugins={[
					headingsPlugin(),
					listsPlugin(),
					quotePlugin(),
					thematicBreakPlugin(),
					markdownShortcutPlugin(),

					toolbarPlugin({
						toolbarContents: () => (
							<>
								<UndoRedo />
								<BoldItalicUnderlineToggles />
								<BlockTypeSelect />
								<ListsToggle />
								<CreateLink />
							</>
						),
					}),
				]}
			/>
		</div>
	);
}
