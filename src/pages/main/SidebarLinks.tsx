import { useInfo } from "@/stores/notes.store";
import { Button } from "@base-ui/react/button";

export default function SidebarLinks({
	categories,
}: {
	categories: readonly string[];
}) {
	const { setCurrentCategory } = useInfo();
	return (
		<nav className="space-y-6">
			<button
				type="button"
				onClick={() => {
					setCurrentCategory("all");
				}}
			>
				<span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
					Main
				</span>
				<ul className="space-y-1">
					<li>
						<div className="flex items-center space-x-3 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-medium text-sm">
							<span>📝</span> <span>All Notes</span>
						</div>
					</li>
				</ul>
			</button>

			<div>
				<span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
					Categories
				</span>
				<ul className="space-y-1">
					{categories.map((category) => {
						if (!category) return ''
						return (
							<Button
								type="button"
								onClick={() => {
									setCurrentCategory(category);
								}}
								key={category}
							>
								<div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm transition-colors">
									<span className="text-xs text-gray-400">●</span>
									<span>{category}</span>
								</div>
							</Button>
						);
					})}
				</ul>
			</div>
		</nav>
	);
}
