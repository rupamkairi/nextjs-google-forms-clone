import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FormManager from "../../components/FormManager";

export default function Form() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState();

  useEffect(() => {
    if (id) {
      (async () => {
        fetch(`/api/form/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setLoading(false);
            setFormData(data);
          });
      })();
    }
  }, [id]);

  return (
    <div>
      {!loading && (
        <div>
          <FormManager formData={formData} id={id} />
        </div>
      )}
    </div>
  );
}
