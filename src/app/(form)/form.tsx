import { useFormState } from "react-dom";
import { uploadFile } from "@/app/(form)/actions";
import SubmitButton from "@/app/(form)/submitBtn";

const initState = { status: 0, message: '' };

export default function UploadForm() {
  const [state, formAction] = useFormState(uploadFile, initState);

  return (
    <div>
      <form action={formAction} className="flex gap-3">
        <input className="outline outline-1 outline-neutral-800 font-mono file:p-3 file:border-none file:bg-neutral-300 file:outline file:outline-1" type="file" id="file" name="file" accept="image/*" />
        <SubmitButton disabled={state.status == 200}>
          {state.status == 200 ?
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z" /></svg>
            : "Upload"}
        </SubmitButton>
      </form>
    </div>
  )
}