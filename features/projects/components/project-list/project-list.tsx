import { ProjectCard } from "../project-card";
import { useGetProjects } from "../../api/use-get-projects";
import { Spinner, ErrorComponent } from "@features/ui";
import styles from "./project-list.module.scss";

export function ProjectList() {
  const { data, isLoading, isError, error, refetch } = useGetProjects();
  const reload = () => {
    refetch();
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    console.error(error);
    return <ErrorComponent onRetry={reload} />;
  }

  return (
    <ul className={styles.list}>
      {data?.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
