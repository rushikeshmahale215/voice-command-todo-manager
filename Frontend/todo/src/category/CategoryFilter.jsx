const CategoryFilter = ({ categories, selected, onSelect }) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      {["All", ...categories].map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          style={{
            marginRight: "10px",
            padding: "6px 12px",
            background: selected === cat ? "#16a34a" : "#e5e7eb",
            color: selected === cat ? "white" : "black",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
