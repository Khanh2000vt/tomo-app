import { IMemberAPI } from "@model";
import { IFilter } from "../model";

const handleCaseFilter = (
  debounce: string,
  members: IMemberAPI[],
  filter: IFilter
): IMemberAPI[] => {
  let result: IMemberAPI[] = members;
  try {
    if (
      debounce !== "" ||
      !!filter.minAge ||
      !!filter.maxAge ||
      filter.gender
    ) {
      if (debounce) {
        console.log("Di vao 1");
        result = result
          .filter((member) => {
            return (
              member.name.toLowerCase().indexOf(debounce.toLowerCase()) !== -1
            );
          })
          .sort((a, b) => {
            return (
              a.name.toLowerCase().indexOf(debounce.toLowerCase()) -
              b.name.toLowerCase().indexOf(debounce.toLowerCase())
            );
          });
      }
      if (!!filter.minAge) {
        console.log("Di vao 2");
        result = result.filter((member) => {
          return member.birth_year >= parseInt(filter?.minAge);
        });
      }
      if (!!filter.maxAge) {
        console.log("Di vao 3");
        result = result.filter((member) => {
          return member.birth_year <= parseInt(filter?.maxAge);
        });
      }
      if (filter.gender) {
        console.log("Di vao 4");
        let isMale = filter.gender === "male";
        result = result.filter((member) => {
          return member.gender === isMale;
        });
      }
    }
    return result;
  } catch (e) {
    return [];
  }
};

export { handleCaseFilter };
