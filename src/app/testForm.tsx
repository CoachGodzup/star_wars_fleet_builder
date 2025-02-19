'use client'
import GlobalForm, { GlobalFormInputs } from "@/components/form/globalForm";

export default function Home() {
  const onSubmit = (data: GlobalFormInputs) => {
    console.log(data);
  }

  return (
    <main>
      <section>
        <div>
          <h1>Create fleet</h1>
        </div>
        <GlobalForm onSubmit={onSubmit}/>
      </section>
    </main>
  );
}
