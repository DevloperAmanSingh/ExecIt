import EditorArea from "./_components/EditorArea";
import Header from "./_components/Header";
import OutputArea from "./_components/OutputArea";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1800px] mx-auto p-4">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <EditorArea />
          <OutputArea />
        </div>
      </div>
    </div>
  );
}
