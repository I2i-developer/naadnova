import { Button } from "@/components/ui/Button";
import { featuredCourses } from "@/config/site";

import styles from "./TrialClassMiniForm.module.css";

export function TrialClassMiniForm() {
  return (
    <form className={styles.form} action="/contact" aria-label="Trial class enquiry preview">
      <label>
        <span>Student name</span>
        <input name="name" placeholder="[Student Name]" autoComplete="name" />
      </label>
      <label>
        <span>Instrument</span>
        <select name="instrument" defaultValue="">
          <option value="" disabled>
            Choose instrument
          </option>
          {featuredCourses.map((course) => (
            <option key={course.slug} value={course.title}>
              {course.title}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Phone</span>
        <input name="phone" placeholder="[Phone Number]" autoComplete="tel" />
      </label>
      <Button type="submit" variant="primary">
        Book a Trial Class
      </Button>
    </form>
  );
}
