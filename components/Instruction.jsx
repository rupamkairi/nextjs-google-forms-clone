import Link from "next/link";

export default function Instruction() {
  return (
    <div className="max-w-screen-md mx-auto">
      <h1 className="text-3xl mb-3 font-black">Instructions</h1>

      <h2 className="text-2xl mb-2 font-extrabold">Using a prebuilt form</h2>
      <ol className="list-decimal ml-4">
        <li>
          go to <Link href="/form/1">/form/1</Link> to use a demo form.
        </li>
        <li>Submit will submit the form data to the next powered backend.</li>
      </ol>

      <br />

      <h2 className="text-2xl mb-2 font-extrabold">Creating a new form</h2>
      <ol className="list-decimal ml-4">
        <li>
          go to data folder at the root of the project and create a file with
          naming pattern <span className="font-mono">formID.json</span>(no
          character between form and ID number). this form will be available on.
          Then use that ID in path like
          <span className="font-mono">/form/ID</span> as path.
        </li>
        <li>
          Replicate the formatting using the form1.json file, without proper
          formatting form will not be rendered, will throw error in the console.
        </li>
      </ol>
    </div>
  );
}
